#!/usr/bin/env node
/**
 * Notion -> blog sync.
 * Reads pages with 状态 = 已发布 from the Notion database, converts blocks to
 * MDX in data/blog/<slug>.mdx (Skyplume/Contentlayer frontmatter), downloads
 * Notion-hosted images into public/static/images/notion/<slug>/ so expiring
 * Notion URLs never reach the site.
 *
 * Env:
 *   NOTION_TOKEN           Internal Integration token (GitHub secret). If unset,
 *                          the script exits 0 with a warning (setup pending).
 *   NOTION_DATA_SOURCE_ID  Data source id of the 博客文章 database.
 *
 * Zero npm dependencies: plain Node 20 fetch against the Notion REST API.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const TOKEN = process.env.NOTION_TOKEN
const DS_ID = process.env.NOTION_DATA_SOURCE_ID || 'd54bd2be-1270-4a5b-a156-8308693fb0a7'
const API = 'https://api.notion.com/v1'
const VERSION = '2025-09-03'
const BLOG_DIR = 'data/blog'
const IMG_ROOT = 'public/static/images/notion'

if (!TOKEN) {
  console.log('NOTION_TOKEN not set — skipping sync (add it under repo Settings > Secrets > Actions).')
  process.exit(0)
}

async function api(pathname, method = 'GET', body) {
  const res = await fetch(`${API}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`Notion API ${method} ${pathname} -> ${res.status}: ${await res.text()}`)
  return res.json()
}

const plain = (rt = []) => rt.map((t) => t.plain_text || '').join('')

// Escape MDX-hostile characters in plain prose (never applied to code).
function escapeText(s) {
  return s.replace(/</g, '&lt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')
}

function richText(rt = []) {
  return rt
    .map((t) => {
      let s = t.plain_text || ''
      const a = t.annotations || {}
      if (a.code) return '`' + s + '`'
      s = escapeText(s)
      if (a.bold) s = `**${s}**`
      if (a.italic) s = `*${s}*`
      if (a.strikethrough) s = `~~${s}~~`
      if (t.href) s = `[${s}](${t.href})`
      return s
    })
    .join('')
}

async function allChildren(blockId) {
  const out = []
  let cursor
  do {
    const q = cursor ? `?start_cursor=${cursor}` : ''
    const page = await api(`/blocks/${blockId}/children${q}`)
    out.push(...page.results)
    cursor = page.has_more ? page.next_cursor : undefined
  } while (cursor)
  return out
}

const imgExt = (url, ctype) => {
  const fromUrl = (url.split('?')[0].match(/\.([a-zA-Z0-9]{3,4})$/) || [])[1]
  if (fromUrl) return fromUrl.toLowerCase()
  if (ctype?.includes('png')) return 'png'
  if (ctype?.includes('webp')) return 'webp'
  if (ctype?.includes('gif')) return 'gif'
  return 'jpg'
}

async function saveImage(url, slug, idx) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`image download ${res.status}: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = imgExt(url, res.headers.get('content-type'))
  const dir = path.join(IMG_ROOT, slug)
  await mkdir(dir, { recursive: true })
  const name = `${idx}.${ext}`
  await writeFile(path.join(dir, name), buf)
  return `/static/images/notion/${slug}/${name}`
}

async function blocksToMd(blocks, slug, imgState, indent = 0) {
  const lines = []
  const pad = '  '.repeat(indent)
  let numbered = 0
  for (const b of blocks) {
    if (b.type !== 'numbered_list_item') numbered = 0
    switch (b.type) {
      case 'paragraph': {
        const t = richText(b.paragraph.rich_text)
        if (t) lines.push(pad + t)
        break
      }
      case 'heading_1': lines.push(`# ${richText(b.heading_1.rich_text)}`); break
      case 'heading_2': lines.push(`## ${richText(b.heading_2.rich_text)}`); break
      case 'heading_3': lines.push(`### ${richText(b.heading_3.rich_text)}`); break
      case 'bulleted_list_item': lines.push(`${pad}- ${richText(b.bulleted_list_item.rich_text)}`); break
      case 'numbered_list_item': lines.push(`${pad}${++numbered}. ${richText(b.numbered_list_item.rich_text)}`); break
      case 'to_do':
        lines.push(`${pad}- [${b.to_do.checked ? 'x' : ' '}] ${richText(b.to_do.rich_text)}`)
        break
      case 'toggle': lines.push(`${pad}- ${richText(b.toggle.rich_text)}`); break
      case 'quote': lines.push(`> ${richText(b.quote.rich_text)}`); break
      case 'callout': {
        const icon = b.callout.icon?.emoji ? `${b.callout.icon.emoji} ` : ''
        lines.push(`> ${icon}${richText(b.callout.rich_text)}`)
        break
      }
      case 'code': {
        const lang = (b.code.language || '').replace('plain text', '')
        lines.push('```' + lang, plain(b.code.rich_text), '```')
        break
      }
      case 'divider': lines.push('---'); break
      case 'equation': lines.push('$$', b.equation.expression, '$$'); break
      case 'bookmark': lines.push(`[${b.bookmark.caption?.[0]?.plain_text || b.bookmark.url}](${b.bookmark.url})`); break
      case 'image': {
        const src = b.image.type === 'file' ? b.image.file.url : b.image.external.url
        const local = await saveImage(src, slug, ++imgState.n)
        const cap = plain(b.image.caption)
        lines.push(`![${escapeText(cap)}](${local})`)
        if (cap) lines.push(`*${escapeText(cap)}*`)
        break
      }
      case 'table': {
        const rows = await allChildren(b.id)
        const md = rows
          .filter((r) => r.type === 'table_row')
          .map((r) => '| ' + r.table_row.cells.map((c) => richText(c)).join(' | ') + ' |')
        if (md.length) {
          lines.push(md[0])
          lines.push('| ' + rows[0].table_row.cells.map(() => '---').join(' | ') + ' |')
          lines.push(...md.slice(1))
        }
        continue // children already consumed as rows
      }
      default:
        break // unsupported block types are skipped silently in v1
    }
    if (b.has_children && b.type !== 'table') {
      const kids = await allChildren(b.id)
      const nested = await blocksToMd(kids, slug, imgState, indent + (b.type.includes('list_item') || b.type === 'toggle' ? 1 : 0))
      lines.push(...nested)
    }
    if (!b.type.includes('list_item')) lines.push('')
  }
  return lines
}

function getProp(props, name) {
  return props[name]
}

async function main() {
  const query = await api(`/data_sources/${DS_ID}/query`, 'POST', {
    filter: { property: '状态', status: { equals: '已发布' } },
    page_size: 100,
  })
  console.log(`Published pages in Notion: ${query.results.length}`)
  let changed = 0
  for (const page of query.results) {
    const p = page.properties
    const title = plain(getProp(p, '标题')?.title)
    const slug = plain(getProp(p, 'Slug')?.rich_text).trim()
    if (!slug) {
      console.log(`SKIP (no Slug): ${title || page.id}`)
      continue
    }
    const dateRaw = getProp(p, '发布日期')?.date?.start || new Date(page.created_time).toISOString()
    const date = dateRaw.slice(0, 10)
    const tags = (getProp(p, '标签')?.multi_select || []).map((t) => t.name)
    const summary = plain(getProp(p, '摘要')?.rich_text)

    const imgState = { n: 0 }
    const blocks = await allChildren(page.id)
    const body = (await blocksToMd(blocks, slug, imgState)).join('\n').replace(/\n{3,}/g, '\n\n').trim()

    const fm = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `date: '${date}'`,
      `tags: ${JSON.stringify(tags)}`,
      'draft: false',
      summary ? `summary: ${JSON.stringify(summary)}` : null,
      'authors:',
      '  - default',
      '---',
      '',
    ]
      .filter((l) => l !== null)
      .join('\n')
    const content = fm + body + '\n'

    const file = path.join(BLOG_DIR, `${slug}.mdx`)
    const old = existsSync(file) ? await readFile(file, 'utf8') : null
    if (old !== content) {
      await writeFile(file, content)
      changed++
      console.log(`WROTE ${file}`)
    } else {
      console.log(`UNCHANGED ${file}`)
    }
  }
  console.log(`Done. ${changed} file(s) updated.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Browse posts by topic.',
})

const themePrinciples = [
  {
    title: 'Reading first',
    description:
      'Body copy, lists, and tag counts stay on low-chroma gray scales so the accent color never competes with long-form reading.',
  },
  {
    title: 'Lab character',
    description:
      'Mineral Teal appears on links, focus states, progress, and key status moments, like an instrument light that gives the site memory.',
  },
  {
    title: 'Dark stability',
    description:
      'Dark mode uses deep teal-gray surfaces with lighter primary accents, keeping hover states and code details clear without glare.',
  },
]

const colorScale = [
  { label: 'Primary 500', className: 'bg-primary-500', text: 'Core links and progress' },
  { label: 'Primary 100', className: 'bg-primary-100', text: 'Tag backgrounds and hints' },
  { label: 'Gray 950', className: 'bg-gray-950', text: 'Dark surface base' },
  { label: 'Gray 200', className: 'bg-gray-200', text: 'Dividers and boundaries' },
]

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const totalTaggedPosts = sortedTags.reduce((total, tag) => total + tagCounts[tag], 0)
  const topTags = sortedTags.slice(0, 4)

  return (
    <div className="min-w-0 overflow-x-hidden py-10 sm:py-14">
      <section className="border-b border-gray-200 pb-10 dark:border-gray-800">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="min-w-0">
            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
              Topic index
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-normal text-gray-950 sm:text-5xl dark:text-gray-50">
              Tags
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-300">
              Use tags to connect related notes, tutorials, essays, and project write-ups.
            </p>
          </div>

          <dl className="grid min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-200 text-center sm:grid-cols-2 dark:border-gray-800 dark:bg-gray-800">
            <div className="bg-white p-5 dark:bg-gray-950">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Tags</dt>
              <dd className="mt-2 text-3xl font-semibold text-gray-950 dark:text-gray-50">
                {sortedTags.length}
              </dd>
            </div>
            <div className="bg-white p-5 dark:bg-gray-950">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Tagged posts</dt>
              <dd className="mt-2 text-3xl font-semibold text-gray-950 dark:text-gray-50">
                {totalTaggedPosts}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="min-w-0 py-10">
        <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-3 sm:gap-x-5">
          {tagKeys.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No tags yet.</p>
          )}
          {sortedTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className="hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-100 dark:hover:bg-primary-950 dark:hover:text-primary-300 dark:hover:ring-primary-800 text-primary-600 dark:text-primary-400 inline-flex max-w-full items-baseline gap-1 rounded-full bg-gray-50 px-3 py-2 text-sm font-medium uppercase ring-1 ring-gray-200 transition-colors dark:bg-gray-900 dark:ring-gray-800"
              aria-label={`View posts tagged ${tag}`}
            >
              <span className="min-w-0 break-words">{tag.split(' ').join('-')}</span>
              <span className="font-semibold text-gray-500 dark:text-gray-400">
                {`(${tagCounts[tag]})`}
              </span>
            </Link>
          ))}
        </div>

        {topTags.length > 0 && (
          <div className="mt-8 flex min-w-0 flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
            <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">Top topics</span>
            {topTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slug(tag)}`}
                className="bg-primary-50 text-primary-700 ring-primary-100 hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-800 dark:hover:bg-primary-900 rounded-full px-3 py-1 text-sm font-medium ring-1 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-gray-200 py-10 dark:border-gray-800">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
              Mineral Teal
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-gray-950 dark:text-gray-50">
              Theme color philosophy
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
              This palette replaces warmer decorative accents with a low-saturation mineral teal. It
              gives the template the feeling of a quiet technical lab: reliable tools, clear
              information, and just enough color to make navigation and state recognizable.
            </p>
          </div>

          <div className="min-w-0 space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {themePrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
                >
                  <h3 className="text-sm font-semibold text-gray-950 dark:text-gray-50">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-4 sm:grid-cols-4">
                {colorScale.map((item) => (
                  <div key={item.label}>
                    <div
                      className={`h-14 rounded-md ring-1 ring-gray-950/10 dark:ring-white/10 ${item.className}`}
                    />
                    <p className="mt-3 text-sm font-semibold text-gray-950 dark:text-gray-50">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

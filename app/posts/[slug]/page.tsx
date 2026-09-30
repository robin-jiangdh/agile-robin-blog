import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { getAllSlugs, getPost, getAdjacent, getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { TableOfContents } from "@/components/toc";
import { Comments } from "@/components/comments";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  try {
    const { meta } = getPost(params.slug);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: "article",
        publishedTime: meta.date,
        images: meta.cover ? [meta.cover] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPost(params.slug);
  } catch {
    notFound();
  }
  const { meta, content } = post;
  const { prev, next } = getAdjacent(params.slug);
  const seriesPosts = meta.seriesSlug
    ? getAllPosts().filter((p) => p.seriesSlug === meta.seriesSlug)
    : [];

  return (
    <div className="container-narrow">
      <article>
        <div className="article-head">
          {meta.category && <div className="cat">{meta.category}</div>}
          <h1>{meta.title}</h1>
          {meta.description && <p className="desc">{meta.description}</p>}
          <div className="article-meta">
            <span>{meta.date}</span>
            {meta.updated && <span>更新于 {meta.updated}</span>}
            {meta.readingTime ? <span>{meta.readingTime} min read</span> : null}
            {(meta.tags || []).map((t) => (
              <span key={t} className="t">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {meta.cover && (
          <div className="article-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={meta.cover} alt={meta.title} />
          </div>
        )}

        <div className="article-layout">
          <div className="md-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                rehypeHighlight,
              ]}
              components={{
                // eslint-disable-next-line @next/next/no-img-element
                img: (props) => <img {...props} loading="lazy" alt={props.alt || ""} />,
                a: (props) => {
                  const href = props.href || "";
                  const external = /^https?:\/\//.test(href);
                  return (
                    <a {...props} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} />
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          <TableOfContents />
        </div>

        <div className="article-foot">
          {seriesPosts.length > 1 && (
            <div className="series-box">
              <div className="lbl">系列 · {meta.series}</div>
              <ol style={{ margin: "10px 0 0", paddingLeft: 20 }}>
                {seriesPosts.map((p) => (
                  <li key={p.slug} style={{ margin: "6px 0" }}>
                    {p.slug === meta.slug ? (
                      <strong>{p.title}</strong>
                    ) : (
                      <a href={`/posts/${p.slug}`}>{p.title}</a>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="pn-nav">
            <div>
              {prev && (
                <a href={`/posts/${prev.slug}`}>
                  <span className="dir">← 更新</span>
                  <span className="t">{prev.title}</span>
                </a>
              )}
            </div>
            <div className="next">
              {next && (
                <a href={`/posts/${next.slug}`}>
                  <span className="dir">更早 →</span>
                  <span className="t">{next.title}</span>
                </a>
              )}
            </div>
          </div>

          <Comments />
        </div>
      </article>
    </div>
  );
}

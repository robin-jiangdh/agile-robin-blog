import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "归档" };

export default function Archive() {
  const posts = getAllPosts();
  const byYear = new Map<string, typeof posts>();
  for (const p of posts) {
    const y = p.date.slice(0, 4);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }

  return (
    <div className="container-narrow">
      <div className="page-head">
        <h1>
          <span className="prompt">$</span> 归档
        </h1>
        <p>共 {posts.length} 篇，按年份排列。</p>
      </div>
      {[...byYear.entries()].map(([year, items]) => (
        <div className="year-block" key={year}>
          <h2>{year}</h2>
          {items.map((p) => (
            <div className="archive-item" key={p.slug}>
              <time>{p.date.slice(5)}</time>
              <a href={`/posts/${p.slug}`}>{p.title}</a>
              {p.category && <span className="cat">{p.category}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <a className="post-card" href={`/posts/${post.slug}`}>
      {post.cover && (
        <span className="cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt="" loading="lazy" />
        </span>
      )}
      {post.category && <span className="cat">{post.category}</span>}
      <h3>{post.title}</h3>
      {post.description && <p>{post.description}</p>}
      <span className="meta">
        <span>{post.date}</span>
        {post.readingTime ? <span>{post.readingTime} min</span> : null}
      </span>
    </a>
  );
}

import { getAllPosts, getAllTags } from "@/lib/posts";
import { site, CATEGORIES } from "@/lib/site";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 6);
  const tags = getAllTags().slice(0, 24);

  return (
    <div className="container">
      <section className="hero">
        <div className="pub-head">
          <span className="eyebrow">技术博客</span>
          <h1>Agile Robin</h1>
          <p className="tagline">{site.tagline} —— 写给爱折腾的工程师。</p>
          <div className="stats">
            <div className="stat">
              <div className="num">{posts.length}</div>
              <div className="lbl">篇文章</div>
            </div>
            <div className="stat">
              <div className="num">3</div>
              <div className="lbl">个固定栏目</div>
            </div>
            <div className="stat">
              <div className="num">2+1</div>
              <div className="lbl">每周更新节奏</div>
            </div>
          </div>
          <div className="btn-row">
            <a className="btn btn-primary" href="#latest">
              开始阅读 →
            </a>
            <a className="btn btn-ghost" href="/about">
              关于我
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="latest">
        <div className="section-head">
          <h2>
            最新发布
          </h2>
          <span className="more">
            <a href="/archive">全部归档 →</a>
          </span>
        </div>
        <div className="post-grid">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {CATEGORIES.map((c) => {
        const items = posts.filter((p) => p.category === c.match).slice(0, 3);
        if (items.length === 0) return null;
        return (
          <section className="section" key={c.slug}>
            <div className="section-head">
              <h2>
                
                {c.name}
              </h2>
              <span className="desc">{c.desc}</span>
            </div>
            <div className="post-grid">
              {items.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="section">
        <div className="section-head">
          <h2>
            标签
          </h2>
        </div>
        <div className="tag-cloud">
          {tags.map((t) => (
            <a key={t.name} className="tag" href={`/archive#tag-${encodeURIComponent(t.name)}`}>
              #{t.name}
              <span className="n">{t.count}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

import { ThemeToggle } from "@/components/theme-toggle";

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="29" height="29" rx="7" stroke="#00e5a0" strokeWidth="2" />
      <path d="M8 12l4 3.5L8 19" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="20.5" x2="22" y2="20.5" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M4 24.5h4l2-4 3 7 3-9 2.5 6H28"
        stroke="#fbbf24"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function Header({ active }: { active?: string }) {
  const links = [
    { href: "/", label: "首页", key: "home" },
    { href: "/archive", label: "归档", key: "archive" },
    { href: "/about", label: "关于", key: "about" },
  ];
  return (
    <header className="site-header">
      <div className="inner">
        <a className="brand" href="/">
          <Logo />
          <span>Agile Robin</span>
        </a>
        <nav className="nav">
          {links.map((l) => (
            <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>
              {l.label}
            </a>
          ))}
          <a href="/rss.xml">RSS</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <span className="sig">Agile Robin · 写给爱折腾的工程师</span>
        <div className="links">
          <a href="/archive">归档</a>
          <a href="/about">关于</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}

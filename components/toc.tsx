"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(".md-body h2, .md-body h3")
    ) as HTMLElement[];
    setItems(
      els
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          text: el.innerText.replace(/[#\s]*$/, "").trim(),
          level: el.tagName === "H2" ? 2 : 3,
        }))
    );
    const onScroll = () => {
      let cur = "";
      for (const el of els) {
        if (el.getBoundingClientRect().top < 120) cur = el.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (items.length < 2) return null;
  return (
    <nav className="toc">
      <div className="toc-title">On this page</div>
      <ul>
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "l3" : ""}>
            <a href={`#${it.id}`} className={active === it.id ? "active" : ""}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";

// Sticky "On this page" list that highlights the section being read.
export default function ArticleToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="On this page">
      <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink/45 mb-4">On this page</div>
      <ol className="m-0 p-0 list-none border-l border-ink/12">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l-2 py-2 pl-4 text-[14px] leading-snug transition-colors duration-300 ${
                  on ? "border-gold-deep text-ink" : "border-transparent text-ink/50 hover:text-ink/80"
                }`}
              >
                {i.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

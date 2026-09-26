import type { CSSProperties, ElementType } from "react";

// Headline reveal: each word rises out of a clipping mask, staggered. Pure
// CSS, so it starts at first paint instead of waiting for JavaScript.
export default function SplitWords({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={w + i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <span
              className="word-rise inline-block"
              style={{ "--d": `${delay + i * stagger}s` } as CSSProperties}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

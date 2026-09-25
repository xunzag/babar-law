"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

// Headline reveal: each word rises out of a clipping mask, staggered.
export default function SplitWords({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.06,
  inView = false,
  accent,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
  /** Words (exact match, punctuation stripped) rendered in the brass accent. */
  accent?: string[];
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
    : { animate: "show" };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial={reduce ? false : "hidden"}
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((w, i) => (
          <span
            key={w + i}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          >
            <motion.span
              variants={{
                hidden: { y: "105%", rotate: 3 },
                show: { y: "0%", rotate: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block origin-bottom-left ${
                accent?.includes(w.replace(/[.,!?]/g, "")) ? "text-gold" : ""
              }`}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

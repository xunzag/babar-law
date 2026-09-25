"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={highlight ? "text-gold-deep" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

// Paragraph whose words light up one by one as it scrolls through view.
export default function ScrollText({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word
            key={w + i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            highlight={highlight.includes(w.replace(/[.,]/g, ""))}
          >
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

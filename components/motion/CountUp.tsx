"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CountUp({
  to,
  duration = 1.8,
  delay = 0,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {(reduce ? to : value).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

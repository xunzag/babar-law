"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type DocketItem = {
  id: string;
  title: string;
  subject: string;
  seat: string;
  role: string;
  status: "Disposed" | "Pending";
  judgment: boolean;
  when: string;
};

const INTERVAL = 2600;

// A live-feeling cause list: matters from the register arrive one at a time,
// newest on top, while older entries slide down and drop off the end.
export default function DocketFeed({
  items,
  visible = 5,
  total,
}: {
  items: DocketItem[];
  visible?: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [head, setHead] = useState(visible - 1);
  const [paused, setPaused] = useState(false);
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setHead((h) => h + 1), INTERVAL);
    return () => clearInterval(id);
  }, [running]);

  const shown = Array.from({ length: visible }, (_, k) => {
    const n = head - k;
    return { n, item: items[((n % items.length) + items.length) % items.length] };
  });
  const serial = (head % total) + 1;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative border border-cream/10 bg-ink-3/80 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-cream/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex w-2 h-2">
            <span className={`absolute inset-0 rounded-full bg-emerald-400/70 ${running ? "animate-ping" : ""}`} />
            <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-cream/70">
            From the register
          </span>
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.12em] text-cream/40 tabular-nums">
          {paused ? "PAUSED · " : ""}
          {String(serial).padStart(3, "0")} / {total}
        </span>
      </div>

      {/* Countdown to the next entry */}
      <div className="h-px bg-cream/5 overflow-hidden">
        {running && (
          <motion.div
            key={head}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
            className="h-full origin-left bg-gold/70"
          />
        )}
      </div>

      <ul className="m-0 p-0 list-none relative overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(({ n, item }, k) => (
            <motion.li
              key={n}
              layout
              initial={{ opacity: 0, y: -28, filter: "blur(6px)" }}
              animate={{ opacity: k === visible - 1 ? 0.35 : 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative px-5 sm:px-6 py-5 border-b border-cream/8 last:border-b-0 ${k === 0 ? "bg-gold/[0.06]" : ""}`}
            >
              {k === 0 && (
                <motion.span
                  layoutId="docket-marker"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold"
                />
              )}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-mono text-[12.5px] text-gold-light tracking-[0.02em] whitespace-nowrap">
                  {item.id}
                </span>
                <span
                  className={`font-mono text-[9.5px] tracking-[0.16em] uppercase px-2 py-1 whitespace-nowrap ${
                    item.status === "Pending"
                      ? "bg-gold text-ink"
                      : item.judgment
                        ? "border border-gold/40 text-gold-light"
                        : "border border-cream/15 text-cream/55"
                  }`}
                >
                  {item.status === "Pending" ? "Pending" : item.judgment ? "Judgment" : "Disposed"}
                </span>
              </div>
              <div className="text-white text-[15.5px] leading-snug tracking-[-0.01em] line-clamp-1 mb-1.5">
                {item.title}
              </div>
              <div className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-cream/40 truncate">
                {item.subject} · {item.seat} · {item.role} · {item.when}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-3 to-transparent" />
    </div>
  );
}

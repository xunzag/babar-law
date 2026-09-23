"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryCategories, galleryPhotos } from "@/lib/content";

export default function GalleryGrid() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLElement | null)[]>([]);

  const items = useMemo(
    () => (category === "All" ? galleryPhotos : galleryPhotos.filter((p) => p.category === category)),
    [category]
  );

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const selectCategory = (c: (typeof galleryCategories)[number]) => {
    setCategory(c);
    setActive(0);
    setProgress(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root: el, threshold: [0.6] }
    );
    frameRefs.current.forEach((f) => f && io.observe(f));
    return () => io.disconnect();
  }, [items]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollByFrame = (d: number) => {
    const el = trackRef.current;
    const frame = frameRefs.current[Math.min(Math.max(active + d, 0), items.length - 1)];
    if (el && frame) {
      const left = frame.offsetLeft - (el.clientWidth - frame.clientWidth) / 2;
      el.scrollTo({ left, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5 mb-9">
        <div className="flex flex-wrap gap-2.5">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => selectCategory(c)}
              className={`px-5 py-2.5 text-[12px] tracking-[0.16em] uppercase border cursor-pointer transition-colors duration-300 ${
                category === c
                  ? "bg-gold text-ink border-gold"
                  : "border-gold/30 text-cream/70 hover:border-gold hover:text-gold-light"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-3 text-gold/70 text-[12px] tracking-[0.2em]">
          <span className="text-gold-light">{String(active + 1).padStart(2, "0")}</span>
          <span className="opacity-50">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-[clamp(18px,4.2vw,32px)] px-[clamp(18px,4.2vw,32px)]"
        >
          {items.map((p, i) => (
            <figure
              key={p.src}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              data-idx={i}
              onClick={() => setOpen(i)}
              className={`group relative m-0 shrink-0 snap-center cursor-zoom-in overflow-hidden border border-gold/20 bg-ink-4 transition-all duration-500 ${
                i % 3 === 1
                  ? "w-[82vw] sm:w-[56vw] lg:w-[44vw] h-[46vh] lg:h-[64vh]"
                  : "w-[72vw] sm:w-[38vw] lg:w-[27vw] h-[56vh] lg:h-[64vh]"
              } ${active === i ? "border-gold/60 opacity-100" : "opacity-55 hover:opacity-90"}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width:1024px) 45vw, 80vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.045]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/92 via-ink/5 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 px-5 py-5">
                <div className="text-gold text-[10.5px] tracking-[0.24em] uppercase mb-1.5">
                  {p.category}
                </div>
                <div className="text-cream/90 text-[16px] leading-snug font-serif">{p.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-5">
          <button
            aria-label="Scroll gallery left"
            onClick={() => scrollByFrame(-1)}
            className="shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30 text-gold cursor-pointer transition-colors hover:border-gold hover:text-gold-light disabled:opacity-30"
            disabled={active === 0}
          >
            ‹
          </button>
          <div className="relative flex-1 h-px bg-cream/10">
            <motion.div
              className="absolute left-0 top-0 h-px bg-gold"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <button
            aria-label="Scroll gallery right"
            onClick={() => scrollByFrame(1)}
            className="shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30 text-gold cursor-pointer transition-colors hover:border-gold hover:text-gold-light disabled:opacity-30"
            disabled={active === items.length - 1}
          >
            ›
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-[rgba(4,4,6,0.95)] flex items-center justify-center p-6 cursor-zoom-out"
          >
            <div className="relative w-[min(1100px,92vw)] h-[84vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={items[open].src} alt={items[open].alt} fill className="object-contain" sizes="92vw" />
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-cream/70 text-sm pointer-events-none">
              {items[open].title} · {open + 1} / {items.length}
            </div>
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gold text-4xl px-3 cursor-pointer hover:text-gold-light"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gold text-4xl px-3 cursor-pointer hover:text-gold-light"
            >
              ›
            </button>
            <span className="absolute top-6 right-8 text-gold text-[13px] tracking-[0.24em] uppercase">Close ✕</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

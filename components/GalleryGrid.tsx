"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { galleryCategories, galleryPhotos } from "@/lib/content";

export default function GalleryGrid() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

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

  return (
    <>
      <div className="flex flex-wrap gap-2.5 mb-10">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
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

      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.figure
              key={p.src}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(i)}
              className="group m-0 break-inside-avoid cursor-zoom-in border border-gold/20 bg-ink-4 overflow-hidden transition-colors duration-300 hover:border-gold/60"
            >
              <div className="overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={900}
                  height={1100}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="w-full h-auto block transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="px-4.5 py-4">
                <div className="text-gold text-[10.5px] tracking-[0.24em] uppercase mb-1.5">
                  {p.category}
                </div>
                <div className="text-cream/80 text-[14.5px] leading-snug">{p.title}</div>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

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

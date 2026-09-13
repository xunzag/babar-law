"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Item = {
  src: string;
  alt: string;
  title: string;
  meta?: string;
};

export default function ImageGrid({
  items,
  variant = "recognition",
}: {
  items: Item[];
  variant?: "recognition" | "gallery" | "certificates";
}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const gridCols =
    variant === "certificates"
      ? "grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6.5"
      : variant === "gallery"
        ? "grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5"
        : "grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5.5";

  return (
    <>
      <div className={`grid ${gridCols}`}>
        {items.map((item, i) => (
          <motion.figure
            key={item.src + i}
            onClick={() => setOpen(i)}
            whileHover={{ y: variant === "certificates" ? -4 : 0 }}
            className={`m-0 cursor-zoom-in border overflow-hidden bg-ink transition-colors duration-350 group ${
              variant === "certificates"
                ? "border-gold/25 p-4.5 hover:border-gold/60"
                : "border-gold/20 hover:border-gold/60"
            }`}
          >
            {variant === "certificates" ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={640}
                height={480}
                className="w-full h-auto block"
              />
            ) : (
              <div
                className={`overflow-hidden relative ${variant === "gallery" ? "h-65" : "h-57.5"}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={`object-cover block transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.06] ${
                    variant === "gallery" ? "object-[center_28%]" : ""
                  }`}
                />
              </div>
            )}
            <figcaption
              className={
                variant === "certificates"
                  ? "text-cream/60 text-sm leading-relaxed pt-4"
                  : variant === "gallery"
                    ? "px-4.5 pt-4 pb-4.5 text-cream/55 text-[13.5px] tracking-wide leading-snug"
                    : "px-5 pt-4.5 pb-5"
              }
            >
              {variant === "recognition" ? (
                <>
                  <div className="text-white font-serif text-xl leading-tight mb-1.5">
                    {item.title}
                  </div>
                  <div className="text-cream/45 text-[13px] tracking-wide">
                    {item.meta}
                  </div>
                </>
              ) : (
                item.title
              )}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-[rgba(4,4,6,0.94)] flex items-center justify-center p-7 cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="relative w-[min(1100px,92vw)] h-[86vh]"
            >
              <Image
                src={items[open].src}
                alt={items[open].alt}
                fill
                className="object-contain border border-gold/40 bg-ink"
              />
            </motion.div>
            <span className="absolute top-7 right-8.5 text-gold text-[13px] tracking-[0.24em] uppercase">
              Close ✕
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

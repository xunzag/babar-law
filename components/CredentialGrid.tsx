"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Item = { src: string; alt: string; title: string; issuer: string; year: string };

export default function CredentialGrid({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
        {items.map((it) => (
          <motion.button
            key={it.src}
            onClick={() => setOpen(it)}
            whileHover={{ y: -4 }}
            className="group text-left cursor-zoom-in border border-gold/25 bg-ink-4 p-3.5 transition-colors duration-300 hover:border-gold/60"
          >
            <div className="relative h-[280px] bg-[#f4f1e8] overflow-hidden">
              <Image src={it.src} alt={it.alt} fill sizes="280px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div className="pt-4 px-1">
              <div className="font-display text-[19px] leading-snug text-white mb-1.5">{it.title}</div>
              <div className="text-cream/55 text-[13px] leading-snug">{it.issuer}</div>
              <div className="text-gold text-[12px] tracking-wide mt-2">{it.year}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-[rgba(4,4,6,0.95)] flex items-center justify-center p-6 cursor-zoom-out"
          >
            <div className="relative w-[min(1000px,92vw)] h-[86vh]">
              <Image src={open.src} alt={open.alt} fill sizes="92vw" className="object-contain" />
            </div>
            <span className="absolute top-6 right-8 text-gold text-[13px] tracking-[0.24em] uppercase">Close ✕</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

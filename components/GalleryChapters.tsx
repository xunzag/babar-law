"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { galleryChapters, type GalleryPhoto } from "@/lib/content";
import { lockScroll } from "@/components/SmoothScroll";

const flat = galleryChapters.flatMap((c) => c.photos.map((p) => ({ ...p, chapter: c.title })));
const indexOf = (p: GalleryPhoto) => flat.findIndex((f) => f.src === p.src);

// Grid layout per chapter size, chosen so no chapter leaves empty cells:
// multiples of three lead with a feature photo spanning two columns and rows.
function layoutFor(n: number) {
  if (n >= 3 && n % 3 === 0) return { grid: "grid-cols-2 lg:grid-cols-3", feature: true };
  if (n === 4) return { grid: "grid-cols-2 lg:grid-cols-4", feature: false };
  if (n === 2) return { grid: "grid-cols-2 max-w-[900px]", feature: false };
  return { grid: "grid-cols-2 lg:grid-cols-3", feature: false };
}

function Tile({
  photo,
  onOpen,
  i,
  feature,
  portrait,
}: {
  photo: GalleryPhoto;
  onOpen: () => void;
  i: number;
  feature: boolean;
  portrait: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`m-0 flex flex-col ${feature ? "col-span-2 lg:row-span-2" : ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className={`group relative block w-full overflow-hidden bg-paper-2 cursor-zoom-in ${
          feature ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : portrait ? "aspect-[4/5]" : "aspect-[4/3]"
        }`}
        aria-label={`Open photo: ${photo.caption}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={feature ? "(max-width: 1024px) 100vw, 64vw" : "(max-width: 1024px) 50vw, 32vw"}
          className={`object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04] ${
            photo.h > photo.w ? "object-[center_25%]" : "object-center"
          }`}
        />
        <span className="absolute right-3 top-3 w-9 h-9 hidden sm:flex items-center justify-center bg-paper text-ink text-[15px] opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          ⤢
        </span>
      </button>
      <figcaption className="pt-2.5 sm:pt-3 text-[12px] sm:text-[13.5px] leading-snug text-ink/65">{photo.caption}</figcaption>
    </motion.figure>
  );
}

export default function GalleryChapters() {
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);

  const step = useCallback((d: number) => {
    setDir(d);
    setOpen((o) => (o === null ? o : (o + d + flat.length) % flat.length));
  }, []);

  useEffect(() => {
    lockScroll(open !== null);
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  useEffect(() => () => lockScroll(false), []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) step(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) step(-1);
  };

  const current = open !== null ? flat[open] : null;

  return (
    <>
      {galleryChapters.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-24 py-[clamp(48px,7vw,96px)] border-t border-ink/12 first:border-t-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 mb-8 sm:mb-10"
          >
            <h2 className="m-0 font-display font-medium text-[clamp(30px,4.2vw,52px)] leading-none text-ink">{c.title}</h2>
            <p className="m-0 text-ink/55 text-[15px] leading-relaxed max-w-[440px]">{c.blurb}</p>
          </motion.div>
          <div className={`grid gap-x-3 gap-y-5 sm:gap-x-6 sm:gap-y-8 ${layoutFor(c.photos.length).grid}`}>
            {c.photos.map((p, i) => (
              <Tile
                key={p.src}
                photo={p}
                i={i}
                feature={layoutFor(c.photos.length).feature && i === 0}
                portrait={c.id === "portraits"}
                onOpen={() => {
                  setDir(1);
                  setOpen(indexOf(p));
                }}
              />
            ))}
          </div>
        </section>
      ))}

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
            className="fixed inset-0 z-[100] bg-ink-6/97 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between gap-4 px-4 sm:px-8 h-16 shrink-0 text-cream/70 text-[13px]">
              <span>
                <span className="text-white tabular-nums">{open + 1}</span>
                <span className="text-cream/50"> / {flat.length}</span>
                <span className="hidden sm:inline text-cream/50"> · {current.chapter}</span>
              </span>
              <button
                onClick={() => setOpen(null)}
                className="h-11 px-4 -mr-2 text-cream hover:text-gold-light cursor-pointer"
                aria-label="Close"
              >
                Close ✕
              </button>
            </div>

            <div className="relative flex-1 min-h-0 overflow-hidden" onClick={() => setOpen(null)}>
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={open}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ x: `${d * 12}%`, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: `${d * -12}%`, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0 px-2 sm:px-20 touch-pan-y"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority
                    sizes="100vw"
                    draggable={false}
                    onClick={(e) => e.stopPropagation()}
                    className="object-contain select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {[-1, 1].map((d) => (
                <button
                  key={d}
                  onClick={(e) => {
                    e.stopPropagation();
                    step(d);
                  }}
                  aria-label={d < 0 ? "Previous photo" : "Next photo"}
                  className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 ${d < 0 ? "left-4" : "right-4"} w-12 h-12 items-center justify-center border border-cream/20 text-cream hover:border-gold hover:text-gold-light bg-ink/40 cursor-pointer transition-colors`}
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>

            <div className="shrink-0 px-4 sm:px-8 py-5 flex items-center justify-between gap-6">
              <p className="m-0 text-cream/85 text-[14.5px] leading-snug max-w-[720px]">{current.caption}</p>
              <span className="sm:hidden text-cream/50 text-[12px] whitespace-nowrap">Swipe ↔</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

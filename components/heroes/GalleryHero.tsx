"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { galleryChapters } from "@/lib/content";

export default function GalleryHero() {
  const total = galleryChapters.reduce((t, c) => t + c.photos.length, 0);
  return (
    <HeroFrame crumb="Gallery">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(36px,6vw,96px)] items-end">
        <div>
          <SplitWords
            text="Gallery."
            className="font-display font-medium text-white text-[clamp(52px,9vw,136px)] leading-[0.9] tracking-[-0.05em] mb-8"
          />
          <FadeIn delay={0.2}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[520px] mb-10">
              Ghulam Shabbir Babar in chambers, at the Bar, at the podium and abroad. {total} photographs.
            </p>
          </FadeIn>
          <nav aria-label="Gallery sections" className="border-t border-cream/10">
            {galleryChapters.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                style={{ "--d": `${0.2 + i * 0.05}s` } as CSSProperties}
                className="fade-rise group flex items-center justify-between gap-4 py-3.5 border-b border-cream/10 text-cream/75 hover:text-white"
              >
                <span className="text-[clamp(16px,1.5vw,18px)] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                  {c.title}
                </span>
                <span className="flex items-center gap-3 text-[12.5px] text-cream/55 tabular-nums">
                  {c.photos.length}
                  <span className="text-gold opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    ↓
                  </span>
                </span>
              </a>
            ))}
          </nav>
        </div>
        <div
          className="clip-up relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden"
        >
          <div className="settle absolute inset-0"
          >
            <Image
              src="/assets/gallery/photo-09.jpg"
              alt="Portrait of Ghulam Shabbir Babar"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

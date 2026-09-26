"use client";

import type { CSSProperties } from "react";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { areasFull } from "@/lib/content";

export default function PracticeHero() {
  return (
    <HeroFrame crumb="Practice areas" image="/assets/hero/lady-justice.jpg" imagePosition="object-[38%_center]">
      <div className="grid gap-12">
        <div>
          <SplitWords
            text="Practice areas."
            className="font-display font-medium text-white text-[clamp(44px,6.4vw,96px)] leading-[0.95] tracking-[-0.045em] mb-9"
          />
          <FadeIn delay={0.35}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[540px]">
              Seven areas of practice, for private individuals, families, investors, companies and institutions in
              Pakistan and abroad.
            </p>
          </FadeIn>
        </div>
        <nav aria-label="Practice areas" className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-cream/10">
          {areasFull.map((a, i) => (
            <a
              key={a.num}
              href={`#area-${a.num}`}
              style={{ "--d": `${0.2 + i * 0.05}s` } as CSSProperties}
              className="fade-rise group relative flex items-center gap-5 py-4 border-b border-cream/10 overflow-hidden"
            >
              <span className="absolute inset-0 bg-cream/4 -translate-x-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
              <span className="relative font-medium text-[11px] text-gold w-6">{a.num}</span>
              <span className="relative flex-1 text-cream/80 text-[clamp(16px,1.6vw,19px)] tracking-[-0.01em] group-hover:text-white transition-colors">
                {a.title}
              </span>
              <span className="relative text-gold opacity-0 -translate-x-3 transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-x-0">
                ↓
              </span>
            </a>
          ))}
        </nav>
      </div>
    </HeroFrame>
  );
}

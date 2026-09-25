"use client";

import { motion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { areasFull } from "@/lib/content";

export default function PracticeHero() {
  return (
    <HeroFrame crumb="Practice areas" index={`${areasFull.length} practices`}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-[clamp(40px,6vw,96px)] items-end">
        <div>
          <SplitWords
            text="Seven practices. One standard of counsel."
            accent={["One", "standard"]}
            className="font-display font-medium text-white text-[clamp(44px,7.2vw,104px)] leading-[0.95] tracking-[-0.045em] mb-9"
          />
          <FadeIn delay={0.7}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[540px]">
              Instructions are accepted from private individuals, families, investors, companies and institutions,
              in Pakistan and abroad.
            </p>
          </FadeIn>
        </div>
        <nav aria-label="Practice areas" className="border-t border-cream/10">
          {areasFull.map((a, i) => (
            <motion.a
              key={a.num}
              href={`#area-${a.num}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-center gap-5 py-4 border-b border-cream/10 overflow-hidden"
            >
              <span className="absolute inset-0 bg-cream/4 -translate-x-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
              <span className="relative font-mono text-[11px] text-gold/70 w-6">{a.num}</span>
              <span className="relative flex-1 text-cream/80 text-[clamp(16px,1.6vw,19px)] tracking-[-0.01em] group-hover:text-white transition-colors">
                {a.title}
              </span>
              <span className="relative text-gold opacity-0 -translate-x-3 transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-x-0">
                ↓
              </span>
            </motion.a>
          ))}
        </nav>
      </div>
    </HeroFrame>
  );
}

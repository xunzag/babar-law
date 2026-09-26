"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import CountUp from "@/components/motion/CountUp";

export default function CasesHero({
  registered,
  byYear,
  since,
}: {
  registered: number;
  byYear: [number, number][];
  since: number;
}) {
  const max = Math.max(...byYear.map(([, n]) => n));
  return (
    <HeroFrame crumb="Case portfolio">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(36px,6vw,88px)] items-center mb-[clamp(48px,7vw,88px)]">
        <div>
          <SplitWords
            text="A record before the High Court of Sindh."
            className="font-display font-medium text-white text-[clamp(40px,6vw,88px)] leading-[0.96] tracking-[-0.045em] mb-8"
          />
          <FadeIn delay={0.3}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[560px] mb-10">
              Constitutional petitions, bail, criminal and civil matters, argued at Karachi and the Sukkur, Larkana
              and Hyderabad benches since {since}.
            </p>
            <div className="flex items-end gap-5 border-t border-cream/10 pt-6">
              <div className="font-display font-medium text-[clamp(64px,9vw,120px)] leading-[0.8] tracking-[-0.06em] text-gold">
                <CountUp to={registered} duration={2.2} delay={0.4} />
              </div>
              <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-cream/50 pb-1.5">
                Matters
                <br />
                registered
              </div>
            </div>
          </FadeIn>
        </div>
        <div
            className="clip-up relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-[#050605]"
        >
          <div className="settle absolute inset-0"
          >
            <Image
              src="/assets/hero/gavel.jpg"
              alt="A judge's gavel"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Matters filed each year */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="eyebrow">Filed each year</span>
        <span className="text-[12.5px] text-cream/55">
          {byYear[0][0]}–{byYear[byYear.length - 1][0]}
        </span>
      </div>
      <div className="flex items-end gap-1 sm:gap-2 h-[clamp(80px,11vw,140px)] border-b border-cream/20">
        {byYear.map(([y, n], i) => (
          <div key={y} className="flex-1 h-full flex flex-col justify-end group relative">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6 + i * 0.035, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: `${Math.max((n / max) * 100, 3)}%` }}
              className="origin-bottom bg-gold/55 group-hover:bg-gold-light transition-colors"
            />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] text-gold-light opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
              {n}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-1 sm:gap-2 mt-2.5">
        {byYear.map(([y]) => (
          <div key={y} className="flex-1 text-center text-cream/50 text-[9px] sm:text-[11px] tabular-nums">
            {String(y).slice(2)}
          </div>
        ))}
      </div>
    </HeroFrame>
  );
}

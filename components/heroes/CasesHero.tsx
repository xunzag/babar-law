"use client";

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
    <HeroFrame crumb="Case portfolio" index="High Court of Sindh">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-10 items-end mb-[clamp(40px,6vw,72px)]">
        <div>
          <SplitWords
            text="A record before the High Court of Sindh."
            accent={["record"]}
            className="font-display font-medium text-white text-[clamp(42px,6.8vw,100px)] leading-[0.95] tracking-[-0.045em] mb-8 max-w-[1000px]"
          />
          <FadeIn delay={0.7}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[600px]">
              Constitutional petitions, bail, criminal and civil matters, argued at Karachi and the Sukkur, Larkana
              and Hyderabad benches since {since}.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.5} className="lg:text-right">
          <div className="font-display font-medium text-[clamp(88px,15vw,210px)] leading-[0.8] tracking-[-0.06em] text-gold">
            <CountUp to={registered} duration={2.4} delay={0.4} />
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/45 mt-4">
            Matters registered
          </div>
        </FadeIn>
      </div>

      {/* Year histogram growing out of the baseline */}
      <div className="flex items-end gap-1 sm:gap-2 h-[clamp(90px,14vw,160px)] border-b border-gold/30">
        {byYear.map(([y, n], i) => (
          <div key={y} className="flex-1 h-full flex flex-col justify-end group relative">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6 + i * 0.04, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: `${Math.max((n / max) * 100, 3)}%` }}
              className="origin-bottom bg-gradient-to-t from-gold/25 to-gold/70 group-hover:from-gold/60 group-hover:to-gold-light transition-colors"
            />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-gold-light opacity-0 group-hover:opacity-100 transition-opacity">
              {n}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-1 sm:gap-2 mt-2.5">
        {byYear.map(([y]) => (
          <div key={y} className="flex-1 text-center font-mono text-cream/35 text-[9px] sm:text-[10px]">
            {String(y).slice(2)}
          </div>
        ))}
      </div>
    </HeroFrame>
  );
}

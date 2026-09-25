"use client";

import { motion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import CountUp from "@/components/motion/CountUp";

export default function ExperienceHero({ count }: { count: number }) {
  const now = new Date().getFullYear();
  return (
    <HeroFrame crumb="Experience" index={`${count} appointments`}>
      <SplitWords
        text="Two decades of appointments, in court and abroad."
        accent={["decades"]}
        className="font-display font-medium text-white text-[clamp(42px,6.8vw,100px)] leading-[0.95] tracking-[-0.045em] mb-[clamp(48px,7vw,88px)] max-w-[1100px]"
      />
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(14px,3vw,40px)]">
        <FadeIn delay={0.4}>
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-cream/40 mb-2">Since</div>
          <div className="font-display font-medium text-[clamp(44px,9vw,140px)] leading-[0.8] tracking-[-0.05em] text-cream/90">
            2004
          </div>
        </FadeIn>
        <div className="relative h-px bg-cream/10 self-end mb-[clamp(18px,3.4vw,52px)]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 origin-left bg-gradient-to-r from-gold/30 via-gold to-gold-light"
          />
          <motion.span
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ delay: 0.7, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold-light shadow-[0_0_20px_4px_rgba(224,200,148,0.5)]"
          />
          <FadeIn delay={1.4} className="absolute left-1/2 -translate-x-1/2 -top-12 text-center whitespace-nowrap">
            <span className="font-display text-gold text-[clamp(20px,2.4vw,30px)] font-medium tracking-[-0.03em]">
              <CountUp to={now - 2004} delay={0.7} duration={1.8} /> years
            </span>
          </FadeIn>
        </div>
        <FadeIn delay={2.2}>
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-gold mb-2 text-right">Today</div>
          <div className="font-display font-medium text-[clamp(44px,9vw,140px)] leading-[0.8] tracking-[-0.05em] text-gold">
            {now}
          </div>
        </FadeIn>
      </div>
    </HeroFrame>
  );
}

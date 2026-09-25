"use client";

import { motion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import CountUp from "@/components/motion/CountUp";
import { associates, initials, principal } from "@/lib/content";

export default function AssociatesHero() {
  const people = [principal, ...associates];
  const highCourt = people.filter((p) => p.designation.includes("High Court") || p === principal).length;
  const advocates = people.filter((p) => p.designation === "Advocate").length;
  const stats: [number, string][] = [
    [people.length, "Members of chambers"],
    [highCourt, "Advocates of the High Court"],
    [advocates, "Advocates"],
  ];

  return (
    <HeroFrame crumb="Associates" index="The chambers">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-[clamp(40px,6vw,96px)] items-center">
        <div>
          <SplitWords
            text="The chambers behind the counsel."
            accent={["counsel"]}
            className="font-display font-medium text-white text-[clamp(46px,7.4vw,108px)] leading-[0.94] tracking-[-0.045em] mb-9"
          />
          <FadeIn delay={0.6}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[560px] mb-12">
              Partners, advocates and court staff who carry the firm&apos;s matters from first filing to final
              hearing, before the High Court of Sindh and the courts below it.
            </p>
          </FadeIn>
          <FadeIn delay={0.8} className="grid grid-cols-3 border-t border-cream/10">
            {stats.map(([n, l], i) => (
              <div key={l} className={`pt-6 pr-4 ${i ? "pl-5 border-l border-cream/10" : ""}`}>
                <div className="font-display font-medium text-[clamp(38px,5vw,64px)] leading-none text-white mb-2.5 tracking-[-0.04em]">
                  <CountUp to={n} delay={0.9 + i * 0.1} />
                </div>
                <div className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.16em] uppercase text-cream/45 leading-relaxed">
                  {l}
                </div>
              </div>
            ))}
          </FadeIn>
        </div>

        {/* Monogram wall */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {people.map((p, i) => (
            <motion.a
              key={p.name}
              href={`#${p === principal ? "principal" : "member-" + i}`}
              initial={{ opacity: 0, rotateX: -80, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: 0.3 + i * 0.055, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 600 }}
              className={`group relative aspect-square border flex items-center justify-center overflow-hidden ${
                i < 2 ? "border-gold/50 bg-gold/8" : "border-cream/10 bg-ink-3"
              }`}
              title={p.name}
            >
              <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span
                className={`relative font-display font-medium text-[clamp(20px,2.6vw,34px)] tracking-[-0.04em] transition-colors duration-300 group-hover:text-ink ${
                  i < 2 ? "text-gold-light" : "text-cream/80"
                }`}
              >
                {initials(p.name)}
              </span>
              <span className="absolute left-2 top-1.5 font-mono text-[9px] text-cream/30 group-hover:text-ink/60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </HeroFrame>
  );
}

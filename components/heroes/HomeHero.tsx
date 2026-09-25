"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitWords from "@/components/motion/SplitWords";
import ArrowLink from "@/components/ArrowLink";
import LocalClock from "@/components/LocalClock";
import { FadeIn } from "@/components/heroes/HeroFrame";

const jurisdictions = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "Cyprus",
  "Greece",
  "Portugal",
  "United Arab Emirates",
  "European Union",
];

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      <motion.div
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/court.png"
            alt="Supreme Court of Pakistan at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%] saturate-[0.7]"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(10,13,19,0.94)_0%,rgba(10,13,19,0.72)_42%,rgba(10,13,19,0.25)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0d13_0%,rgba(10,13,19,0)_45%)]" />
      <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay pointer-events-none" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: fade }}
        className="relative flex-1 flex items-end w-full max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[140px] pb-[clamp(48px,7vw,80px)]"
      >
        <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12 items-end">
          <div className="max-w-[980px]">
            <FadeIn className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-[pulseDot_2.4s_ease-in-out_infinite]" />
              <span className="eyebrow">Advocates &amp; International Consultants · Est. 2004</span>
            </FadeIn>
            <SplitWords
              text="Counsel of consequence, across borders."
              accent={["borders"]}
              delay={0.25}
              className="font-display font-medium text-white text-[clamp(46px,8.6vw,128px)] leading-[0.94] tracking-[-0.045em] mb-9"
            />
            <FadeIn delay={0.9}>
              <p className="text-[clamp(16px,1.5vw,19px)] leading-[1.65] text-cream/70 max-w-[600px] mb-10">
                The practice of <span className="text-white">Ghulam Shabbir Babar</span>, Attorney at Law and LLM
                (Europe), and his chambers of advocates, advising private clients, investors and institutions in
                Pakistan, the United States, the United Kingdom and the European Union.
              </p>
              <div className="flex gap-3 flex-wrap">
                <ArrowLink href="/contact">Book a consultation</ArrowLink>
                <ArrowLink href="/practice-areas" variant="outline">
                  Practice areas
                </ArrowLink>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={1.2} className="hidden lg:block">
            <div className="border border-cream/12 bg-ink/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow text-[10px]!">Local time</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-cream/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-[pulseDot_2s_ease-in-out_infinite]" />
                  LIVE
                </span>
              </div>
              <LocalClock
                className="grid gap-3"
                cities={[
                  { city: "Karachi", tz: "Asia/Karachi" },
                  { city: "New York", tz: "America/New_York" },
                  { city: "Nicosia", tz: "Asia/Nicosia" },
                  { city: "Toronto", tz: "America/Toronto" },
                ]}
              />
            </div>
          </FadeIn>
        </div>
      </motion.div>

      {/* Jurisdiction ticker */}
      <FadeIn delay={1.3} className="relative border-t border-cream/10 bg-ink/50 backdrop-blur-sm">
        <div className="flex overflow-hidden py-4.5 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max shrink-0 animate-[marquee_48s_linear_infinite]">
            {[...jurisdictions, ...jurisdictions].map((j, i) => (
              <span key={j + i} className="flex items-center gap-8 pr-8 font-mono text-[11.5px] tracking-[0.22em] uppercase text-cream/55 whitespace-nowrap">
                {j}
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

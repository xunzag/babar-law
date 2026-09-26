"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitWords from "@/components/motion/SplitWords";
import ArrowLink from "@/components/ArrowLink";
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
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-0">
        <div className="absolute inset-0 animate-[heroSettle_2.2s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Image
            src="/assets/hero/supreme-court.jpg"
            alt="The Supreme Court of Pakistan, Islamabad, at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] md:object-center"
          />
        </div>
      </motion.div>
      {/* A flat scrim keeps the headline legible over the photograph */}
      <div className="absolute inset-0 bg-ink/60 md:bg-ink/50" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: fade }}
        className="relative flex-1 flex items-end w-full max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[120px] pb-[clamp(40px,6vw,72px)]"
      >
        <div className="max-w-[920px]">
          <FadeIn className="eyebrow mb-6 sm:mb-8">Advocates &amp; international legal consultants · Karachi</FadeIn>
          <SplitWords
            text="Litigation in Pakistan. Counsel across borders."
            delay={0.1}
            className="font-display font-medium text-white text-[clamp(42px,7.6vw,112px)] leading-[0.96] tracking-[-0.045em] mb-7 sm:mb-9"
          />
          <FadeIn delay={0.35}>
            <p className="text-[clamp(16px,1.5vw,19px)] leading-[1.65] text-cream/75 max-w-[600px] mb-9 sm:mb-10">
              The practice of <span className="text-white">Ghulam Shabbir Babar</span>, Attorney at Law and LLM
              (Europe), and his chambers of advocates. Advising private clients, investors and institutions in
              Pakistan, the United States, the United Kingdom and the European Union since 2004.
            </p>
            <div className="flex gap-3 flex-wrap">
              <ArrowLink href="/contact">Book a consultation</ArrowLink>
              <ArrowLink href="/practice-areas" variant="outline">
                Practice areas
              </ArrowLink>
            </div>
          </FadeIn>
        </div>
      </motion.div>

      {/* Jurisdictions served */}
      <FadeIn delay={0.6} className="relative border-t border-cream/10 bg-ink/60 backdrop-blur-sm">
        <div className="flex overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max shrink-0 animate-[marquee_60s_linear_infinite]">
            {[...jurisdictions, ...jurisdictions].map((j, i) => (
              <span
                key={j + i}
                className="flex items-center gap-7 pr-7 text-[12px] font-medium tracking-[0.14em] uppercase text-cream/55 whitespace-nowrap"
              >
                {j}
                <span className="w-1 h-1 rounded-full bg-gold/60" />
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

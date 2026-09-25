"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import RotatingSeal from "@/components/heroes/RotatingSeal";

const lines = [
  ["Practice", "Advocate of the High Court of Sindh, 2006"],
  ["New York", "Foreign Attorney, Law Offices of Manuel B. Quintal, P.C."],
  ["Academia", "Visiting Professor & LLM Thesis Supervisor"],
  ["Education", "EMLE, Bologna & Ghent · Erasmus Mundus scholar"],
];

export default function AboutHero() {
  return (
    <HeroFrame crumb="About" index="Principal">
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(40px,6vw,96px)] items-end">
        <div>
          <SplitWords
            text="Ghulam Shabbir Babar"
            className="font-display font-medium text-white text-[clamp(52px,9vw,136px)] leading-[0.9] tracking-[-0.05em] mb-10"
            stagger={0.1}
          />
          <FadeIn delay={0.6}>
            <p className="text-gold-light text-[clamp(17px,1.6vw,21px)] leading-snug mb-10 max-w-[560px]">
              Attorney at Law · LLM (Europe). Litigator since 2004, international consultant in immigration,
              corporate and commercial matters.
            </p>
          </FadeIn>
          <div className="border-t border-cream/10">
            {lines.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 py-3.5 border-b border-cream/10"
              >
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream/40 pt-1">{k}</span>
                <span className="text-cream/80 text-[15px]">{v}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/gallery/photo-07.jpg"
                alt="Portrait of Ghulam Shabbir Babar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,13,19,0.5),transparent_40%)]" />
          </motion.div>
          <FadeIn delay={1.2} className="absolute -left-10 -bottom-10 hidden sm:block">
            <RotatingSeal
              text="ATTORNEY AT LAW · LLM EUROPE · KARACHI · NEW YORK · "
              center="2004"
              className="text-gold"
            />
          </FadeIn>
        </div>
      </div>
    </HeroFrame>
  );
}

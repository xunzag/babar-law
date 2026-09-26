"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";

export default function FaqHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <HeroFrame crumb="FAQ">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] gap-10 items-center">
        <div className="max-w-[760px]">
          <SplitWords
            text="Frequently asked questions."
            className="font-display font-medium text-white text-[clamp(44px,7vw,104px)] leading-[0.95] tracking-[-0.045em] mb-8"
          />
          <FadeIn delay={0.25}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[520px] m-0">
              Jurisdictions, remote consultations, investment residency and how an engagement begins.
            </p>
          </FadeIn>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block justify-self-end w-full max-w-[380px]"
        >
          <motion.div style={reduce ? undefined : { y }}>
            <Image
              src="/assets/hero/justice-scale.png"
              alt="Scales of justice resting on law books"
              width={500}
              height={500}
              priority
              className="w-full h-auto opacity-90"
            />
          </motion.div>
        </motion.div>
      </div>
    </HeroFrame>
  );
}

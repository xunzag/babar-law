"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";

export default function FaqHero({ count }: { count: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 600], [8, -14]);
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <HeroFrame crumb="FAQ" index={`${count} questions`}>
      <div className="relative">
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={reduce ? undefined : { rotate, y }}
          className="absolute right-0 -top-16 sm:-top-28 font-display font-semibold text-[clamp(220px,34vw,480px)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(195_160_102/0.4)] select-none pointer-events-none"
        >
          ?
        </motion.div>
        <div className="relative max-w-[860px]">
          <SplitWords
            text="Questions, answered plainly."
            accent={["plainly."]}
            className="font-display font-medium text-white text-[clamp(46px,7.6vw,112px)] leading-[0.94] tracking-[-0.045em] mb-9"
          />
          <FadeIn delay={0.6}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[520px] m-0">
              Jurisdictions, remote consultations, investment residency and how an engagement begins.
            </p>
          </FadeIn>
        </div>
      </div>
    </HeroFrame>
  );
}

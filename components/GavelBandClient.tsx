"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function GavelBandClient({ src }: { src: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.02, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const leftX = useTransform(scrollYProgress, [0.1, 0.5], ["-18%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.5], ["18%", "0%"]);
  const fade = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <section ref={ref} className="relative h-[clamp(560px,110vh,1000px)] overflow-hidden bg-[#050605]">
      <motion.div style={reduce ? undefined : { scale, y }} className="absolute inset-0">
        <Image src={src} alt="A wooden judge's gavel lit against a dark background" fill sizes="100vw" className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,5,0.85)_85%)]" />
      <div className="absolute inset-0 grain opacity-[0.08] mix-blend-overlay pointer-events-none" />

      <div className="relative h-full max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(48px,8vw,96px)] flex flex-col justify-between">
        <motion.div style={reduce ? undefined : { x: leftX, opacity: fade }}>
          <div className="eyebrow mb-4">Litigation since 2004</div>
          <div className="font-display font-medium text-white text-[clamp(40px,7.5vw,112px)] leading-[0.92] tracking-[-0.05em]">
            From first filing
          </div>
        </motion.div>
        <motion.div style={reduce ? undefined : { x: rightX, opacity: fade }} className="self-end text-right">
          <div className="font-display font-medium text-gold text-[clamp(40px,7.5vw,112px)] leading-[0.92] tracking-[-0.05em]">
            to final hearing.
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50 mt-5">
            High Court of Sindh · Karachi · Sukkur · Larkana · Hyderabad
          </div>
        </motion.div>
      </div>
    </section>
  );
}

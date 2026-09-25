"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Shared chrome for inner-page heroes: header clearance, grid texture and a
// breadcrumb. The composition inside is unique to each page.
export default function HeroFrame({
  crumb,
  index,
  children,
  className,
  grid = true,
}: {
  crumb: string;
  index?: string;
  children: ReactNode;
  className?: string;
  grid?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden bg-ink border-b border-cream/8 ${className ?? ""}`}>
      {grid && (
        <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_75%)]" />
      )}
      <div className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(120px,15vw,168px)] pb-[clamp(56px,8vw,96px)]">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase mb-[clamp(36px,6vw,64px)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-[pulseDot_2.4s_ease-in-out_infinite]" />
          <span className="text-cream/40">Babar Law Associates</span>
          <span className="text-cream/20">/</span>
          <span className="text-gold">{crumb}</span>
          {index && <span className="ml-auto text-cream/30 hidden sm:inline">{index}</span>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

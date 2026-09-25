"use client";

import { motion } from "framer-motion";

// Horizontal bar that fills to its value when scrolled into view.
export default function GrowBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${pct}%` }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    />
  );
}

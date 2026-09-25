"use client";

import { motion } from "framer-motion";

// Flex segment that grows from nothing to its share of a stacked bar.
export default function GrowSegment({ grow, delay = 0, className }: { grow: number; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ flexGrow: 0.0001 }}
      whileInView={{ flexGrow: grow }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ flexBasis: 0 }}
      className={className}
    />
  );
}

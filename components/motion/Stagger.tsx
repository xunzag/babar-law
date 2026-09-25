"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Container + item pair for staggered in-view reveals of lists and grids.
export function Stagger({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

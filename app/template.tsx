"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Re-mounts on every navigation: a quick fade so page changes feel continuous.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

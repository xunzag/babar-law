"use client";

import { motion } from "framer-motion";
import { firm } from "@/lib/content";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={firm.whatsapp}
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="fixed right-6.5 bottom-6.5 z-[80] flex items-center gap-2.5 bg-gold text-ink py-3.5 px-5.5 text-[13px] tracking-[0.16em] uppercase shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-gold-light"
    >
      WhatsApp
    </motion.a>
  );
}

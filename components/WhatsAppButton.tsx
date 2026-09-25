"use client";

import { motion } from "framer-motion";
import { firm } from "@/lib/content";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={firm.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Message on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed right-5 bottom-5 z-[80] flex items-center h-14 px-4 rounded-full bg-gold text-ink shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-colors duration-500 hover:bg-gold-light hover:text-ink"
    >
      <span className="absolute inset-0 rounded-full border border-gold animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40 pointer-events-none" />
      <WhatsAppIcon className="relative w-6 h-6 shrink-0" />
      <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-medium transition-[max-width,margin] duration-500 ease-out-expo group-hover:max-w-[120px] group-hover:ml-2.5">
        WhatsApp
      </span>
    </motion.a>
  );
}

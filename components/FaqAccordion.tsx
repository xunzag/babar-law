"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "@/lib/content";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-ink/15">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-ink/15">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group w-full grid grid-cols-[minmax(0,1fr)_40px] items-center gap-4 py-7 cursor-pointer text-left"
            >
              <h3
                className={`m-0 font-display font-medium text-[clamp(20px,2.2vw,28px)] leading-[1.2] transition-colors ${
                  isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                }`}
              >
                {f.q}
              </h3>
              <span
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  isOpen ? "bg-ink border-ink text-gold" : "border-ink/20 text-ink group-hover:border-ink"
                }`}
              >
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-xl leading-none">
                  +
                </motion.span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="m-0 pb-8 pr-14 text-ink/65 text-[16.5px] leading-[1.8] max-w-[820px]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

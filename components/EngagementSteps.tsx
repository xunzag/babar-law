"use client";

import { motion } from "framer-motion";

const steps = [
  ["Send a short summary", "Through the enquiry form, WhatsApp or email, with your country of residence and any deadline."],
  ["Initial assessment", "Mr. Babar reviews the matter personally and replies, usually within one business day."],
  ["Scope and fees", "Where the firm can act, you receive a scope of work and fee basis before anything begins."],
];

// Three-step timeline: the connecting line draws across as it scrolls in,
// and each step lands in turn.
export default function EngagementSteps() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      className="relative m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
    >
      {/* Connector: vertical on phones, horizontal from tablet up */}
      <motion.span
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="hidden md:block absolute left-0 right-0 top-6 h-px bg-ink/25 origin-left"
      />
      <motion.span
        aria-hidden
        variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="md:hidden absolute left-6 top-6 bottom-6 w-px bg-ink/25 origin-top"
      />
      {steps.map(([title, body], i) => (
        <motion.li
          key={title}
          variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.25 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid grid-cols-[48px_minmax(0,1fr)] md:block gap-5"
        >
          <span className="relative z-10 w-12 h-12 rounded-full bg-ink text-gold flex items-center justify-center font-display font-medium text-[18px] md:mb-7 ring-8 ring-paper">
            {i + 1}
          </span>
          <span>
            <span className="block font-display font-medium text-[clamp(20px,2vw,24px)] leading-tight tracking-[-0.02em] mb-2.5">
              {title}
            </span>
            <span className="block text-[15.5px] leading-relaxed text-ink/65 max-w-[340px]">{body}</span>
          </span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

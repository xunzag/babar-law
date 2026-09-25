"use client";

import { motion, useReducedMotion } from "framer-motion";

// Circular text seal that turns slowly, used as a hero ornament.
export default function RotatingSeal({
  text,
  center,
  className,
}: {
  text: string;
  center: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative w-36 h-36 ${className ?? ""}`}>
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-mono" fontSize="12.5" letterSpacing="3.6">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[26%] rounded-full bg-gold text-ink flex items-center justify-center font-display font-semibold text-[15px] tracking-[-0.02em]">
        {center}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Image that drifts against the scroll and unveils with a clip-path wipe.
export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName = "object-cover",
  strength = 12,
  priority,
  sizes = "(max-width: 900px) 100vw, 50vw",
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    // The observed wrapper stays unclipped so the in-view trigger always fires.
    <motion.div
      ref={ref}
      initial={reveal && !reduce ? "hidden" : false}
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative ${className ?? ""}`}
    >
      <motion.div
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          shown: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={reduce ? undefined : { y }}
          className="absolute inset-x-0 -inset-y-[14%]"
        >
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={imgClassName} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

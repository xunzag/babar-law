"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

// Shared chrome for inner-page heroes: header clearance, a breadcrumb and an
// optional photographic backdrop. The composition inside is unique per page.
export default function HeroFrame({
  crumb,
  children,
  className,
  image,
  imagePosition = "object-center",
}: {
  crumb: string;
  children: ReactNode;
  className?: string;
  image?: string;
  imagePosition?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-ink border-b border-cream/8 ${className ?? ""}`}>
      {/* Photograph as its own panel beside the text: no overlay needed */}
      {image && (
        <div
          className="clip-left hidden lg:block absolute inset-y-0 right-0 w-[40%]"
        >
          <Image src={image} alt="" fill priority sizes="40vw" className={`object-cover ${imagePosition}`} />
        </div>
      )}
      <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(112px,14vw,160px)] pb-[clamp(52px,7vw,88px)]">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2.5 text-[12.5px] mb-[clamp(32px,5vw,56px)]"
        >
          <Link href="/" className="text-cream/60 hover:text-cream">
            Home
          </Link>
          <span className="text-cream/25">/</span>
          <span className="text-gold">{crumb}</span>
        </motion.nav>
        <div className={image ? "lg:max-w-[54%]" : undefined}>{children}</div>
        {image && (
          <div className="lg:hidden relative aspect-[16/10] mt-10 -mx-[clamp(16px,4vw,40px)] overflow-hidden">
            <Image src={image} alt="" fill sizes="100vw" className={`object-cover ${imagePosition}`} />
          </div>
        )}
      </div>
    </section>
  );
}

// Entrance fade for hero content, in CSS so it runs before hydration.
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`fade-rise ${className ?? ""}`} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

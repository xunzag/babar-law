"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";

const lines = [
  ["Practice", "Advocate of the High Court of Sindh, 2006"],
  ["New York", "Foreign Attorney, Law Offices of Manuel B. Quintal, P.C."],
  ["Academia", "Visiting Professor & LLM Thesis Supervisor"],
  ["Education", "EMLE, Bologna & Ghent · Erasmus Mundus scholar"],
];

export default function AboutHero() {
  return (
    <HeroFrame crumb="About">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(40px,6vw,96px)] items-end">
        <div>
          <SplitWords
            text="Ghulam Shabbir Babar"
            className="font-display font-medium text-white text-[clamp(52px,9vw,136px)] leading-[0.9] tracking-[-0.05em] mb-10"
            stagger={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="text-gold-light text-[clamp(17px,1.6vw,21px)] leading-snug mb-10 max-w-[560px]">
              Attorney at Law · LLM (Europe). Litigator since 2004, international consultant in immigration,
              corporate and commercial matters.
            </p>
          </FadeIn>
          <div className="border-t border-cream/10">
            {lines.map(([k, v], i) => (
              <div
                key={k}
                style={{ "--d": `${0.4 + i * 0.08}s` } as CSSProperties}
                className="fade-rise grid grid-cols-[110px_minmax(0,1fr)] gap-4 py-3.5 border-b border-cream/10"
              >
                <span className="font-medium text-[10.5px] tracking-[0.18em] uppercase text-cream/55 pt-1">{k}</span>
                <span className="text-cream/80 text-[15px]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="clip-up relative aspect-[4/5] overflow-hidden"
          >
            <div className="settle absolute inset-0"
            >
              <Image
                src="/assets/gallery/photo-18.jpg"
                alt="Portrait of Ghulam Shabbir Babar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

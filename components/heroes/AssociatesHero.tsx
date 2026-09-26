"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import CountUp from "@/components/motion/CountUp";
import { associates, initials, principal } from "@/lib/content";

export default function AssociatesHero() {
  const people = [principal, ...associates];
  const highCourt = people.filter((p) => p.designation.includes("High Court") || p === principal).length;
  const advocates = people.filter((p) => p.designation === "Advocate").length;
  const stats: [number, string][] = [
    [people.length, "Members of chambers"],
    [highCourt, "Advocates of the High Court"],
    [advocates, "Advocates"],
  ];

  return (
    <HeroFrame crumb="Associates">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-[clamp(40px,6vw,96px)] items-center">
        <div>
          <SplitWords
            text="The chambers."
            className="font-display font-medium text-white text-[clamp(46px,7.4vw,108px)] leading-[0.94] tracking-[-0.045em] mb-9"
          />
          <FadeIn delay={0.3}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[560px] mb-12">
              Partners, Advocates of the High Court, advocates and court staff of Babar Law Associates, Karachi.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="grid grid-cols-3 border-t border-cream/10">
            {stats.map(([n, l], i) => (
              <div key={l} className={`pt-6 pr-4 ${i ? "pl-5 border-l border-cream/10" : ""}`}>
                <div className="font-display font-medium text-[clamp(38px,5vw,64px)] leading-none text-white mb-2.5 tracking-[-0.04em]">
                  <CountUp to={n} delay={0.9 + i * 0.1} />
                </div>
                <div className="font-medium text-[10px] sm:text-[10.5px] tracking-[0.16em] uppercase text-cream/60 leading-relaxed">
                  {l}
                </div>
              </div>
            ))}
          </FadeIn>
        </div>

        {/* Portrait wall: photographs where we have them, monograms otherwise */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {people.map((p, i) => {
            const photo = p === principal ? principal.image : "photo" in p ? p.photo : undefined;
            return (
              <a
                key={p.name}
                href={`#${p === principal ? "principal" : "member-" + i}`}
                style={{ "--d": `${0.1 + i * 0.04}s` } as CSSProperties}
                className="fade-rise group relative aspect-[4/5] overflow-hidden bg-ink-3 border border-cream/8"
                title={p.name}
              >
                {photo ? (
                  <Image
                    src={photo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 25vw, 11vw"
                    priority={i < 4}
                    className="object-cover object-top grayscale-[0.85] transition-[filter,transform] duration-700 ease-out-expo group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-display font-medium text-[clamp(18px,2.4vw,30px)] tracking-[-0.04em] text-cream/50 transition-colors duration-300 group-hover:text-gold-light">
                    {initials(p.name)}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-ink/85 text-[10.5px] sm:text-[11.5px] leading-tight text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {p.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </HeroFrame>
  );
}

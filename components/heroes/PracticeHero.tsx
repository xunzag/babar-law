import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { areasFull } from "@/lib/content";

// Full-bleed photographic hero. The statue sits centre-right, so the text
// takes the left and an even scrim keeps it legible over the stone.
export default function PracticeHero() {
  return (
    <section className="relative min-h-[88svh] flex flex-col overflow-hidden bg-ink">
      <div className="absolute inset-0 settle">
        <Image
          src="/assets/hero/lady-justice.jpg"
          alt="Statue of Lady Justice before a court building at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>
      <div className="absolute inset-0 bg-ink/65 lg:bg-ink/58" />

      <div className="relative flex-1 flex flex-col justify-end w-full max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(112px,14vw,160px)] pb-[clamp(40px,6vw,72px)]">
        <nav aria-label="Breadcrumb" className="fade-rise flex items-center gap-2.5 text-[12.5px] mb-auto pb-10">
          <Link href="/" className="text-cream/70 hover:text-white">
            Home
          </Link>
          <span className="text-cream/50">/</span>
          <span className="text-gold-light">Practice areas</span>
        </nav>

        <div className="max-w-[640px] [text-shadow:0_1px_24px_rgba(10,13,19,0.55)]">
          <SplitWords
            text="Practice areas."
            className="font-display font-medium text-white text-[clamp(48px,7.4vw,112px)] leading-[0.92] tracking-[-0.05em] mb-7"
          />
          <FadeIn delay={0.3}>
            <p className="m-0 text-cream/90 text-[clamp(16px,1.5vw,19px)] leading-[1.65] mb-10">
              Seven areas of practice, for private individuals, families, investors, companies and institutions in
              Pakistan and abroad.
            </p>
          </FadeIn>
        </div>

        <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
          {areasFull.map((a, i) => (
            <li key={a.num} className="fade-rise" style={{ "--d": `${0.4 + i * 0.05}s` } as CSSProperties}>
              <a
                href={`#area-${a.num}`}
                className="inline-flex items-center gap-2 h-10 px-4 bg-ink/70 backdrop-blur-sm border border-cream/15 text-[13.5px] text-cream hover:bg-gold hover:text-ink hover:border-gold transition-colors"
              >
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

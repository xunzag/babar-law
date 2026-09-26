"use client";

import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import LocalClock from "@/components/LocalClock";
import { callLines, firm } from "@/lib/content";

export default function ContactHero() {
  return (
    <HeroFrame crumb="Consultation">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-[clamp(40px,6vw,96px)] items-end">
        <div>
          <SplitWords
            text="Arrange a consultation."
            className="font-display font-medium text-white text-[clamp(48px,8vw,124px)] leading-[0.92] tracking-[-0.05em] mb-9"
          />
          <FadeIn delay={0.3}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[560px] m-0">
              Send a detailed enquiry below and Mr. Babar will review it personally, or reach him directly on
              WhatsApp, by email or by telephone.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.4} className="border border-cream/12 bg-ink-3/70 backdrop-blur p-6 grid gap-6">
          <div>
            <div className="eyebrow mb-4">Local time</div>
            <LocalClock
              className="grid gap-3"
              cities={[
                { city: "Karachi", tz: "Asia/Karachi" },
                { city: "New York", tz: "America/New_York" },
              ]}
            />
          </div>
          <div className="grid gap-2 border-t border-cream/10 pt-5">
            <a href={firm.whatsapp} target="_blank" rel="noopener" className="flex justify-between text-[14px] text-cream hover:text-gold-light">
              <span>WhatsApp</span>
              <span className="text-gold">→</span>
            </a>
            <a href={callLines[0].href} className="flex justify-between text-[14px] text-cream hover:text-gold-light">
              <span>{callLines[0].number}</span>
              <span className="text-gold">→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </HeroFrame>
  );
}

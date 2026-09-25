import FaqHero from "@/components/heroes/FaqHero";
import FaqAccordion from "@/components/FaqAccordion";
import ArrowLink from "@/components/ArrowLink";
import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about jurisdictions, remote consultations, investment residency and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div>
      <FaqHero count={faqs.length} />
      <section className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(64px,9vw,120px)] grid lg:grid-cols-[320px_minmax(0,1fr)] gap-x-[clamp(40px,6vw,96px)] gap-y-12">
          <Reveal className="lg:sticky lg:top-28 self-start">
            <div className="eyebrow text-gold-deep! mb-5">Still unsure?</div>
            <p className="m-0 mb-8 text-ink/65 text-[16px] leading-relaxed">
              Every matter is different. Send a short summary and receive an initial assessment before any engagement
              begins.
            </p>
            <ArrowLink href="/contact" variant="dark">
              Ask your question
            </ArrowLink>
          </Reveal>
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
}

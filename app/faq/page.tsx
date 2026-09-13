import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about jurisdictions, remote consultations, investment residency and more.",
};

export default function FaqPage() {
  return (
    <div>
      <PageHero eyebrow="FAQ" title="Common questions" />
      <section className="max-w-[940px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(46px,8vw,76px)] pb-27.5">
        <FaqAccordion />
      </section>
    </div>
  );
}

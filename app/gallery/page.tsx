import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Offices, conventions and international engagements of Ghulam Shabbir Babar and Babar Law Associates.",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="In practice, and abroad"
        description="From the courts and offices of Karachi to meetings in New York and Toronto."
      />
      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(48px,8vw,84px)]">
        <Reveal>
          <GalleryGrid />
        </Reveal>
      </section>
    </div>
  );
}

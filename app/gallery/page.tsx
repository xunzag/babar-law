import Reveal from "@/components/Reveal";
import GalleryHero from "@/components/heroes/GalleryHero";
import GalleryGrid from "@/components/GalleryGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Offices, conventions and international engagements of Ghulam Shabbir Babar and Babar Law Associates.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div>
      <GalleryHero />
      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(48px,8vw,84px)]">
        <Reveal>
          <GalleryGrid />
        </Reveal>
      </section>
    </div>
  );
}

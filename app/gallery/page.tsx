import GalleryHero from "@/components/heroes/GalleryHero";
import GalleryChapters from "@/components/GalleryChapters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Ghulam Shabbir Babar in chambers, at the Bar, at the podium and abroad: Karachi, New York, Brussels, Toronto and Cyprus.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div>
      <GalleryHero />
      <div className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]">
          <GalleryChapters />
        </div>
      </div>
    </div>
  );
}

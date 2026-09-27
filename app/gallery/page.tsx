import Image from "next/image";
import HeroFrame from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { galleryPhotos } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of Ghulam Shabbir Babar in chambers, at the Bar, at the podium and abroad: Karachi, New York, Washington, Brussels, Toronto and Cyprus.",
  alternates: { canonical: "/gallery" },
};

// A plain wall of photographs: every image shown whole, in balanced columns,
// with hairline gutters and no overlays.
export default function GalleryPage() {
  return (
    <div>
      <HeroFrame crumb="Gallery">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SplitWords
            text="Gallery."
            className="m-0 font-display font-medium text-white text-[clamp(52px,9vw,136px)] leading-[0.9] tracking-[-0.05em]"
          />
          <p className="fade-rise m-0 max-w-[420px] text-cream/65 text-[clamp(15px,1.4vw,18px)] leading-[1.6]">
            Ghulam Shabbir Babar in chambers, at the Bar, at the podium and abroad. {galleryPhotos.length}{" "}
            photographs.
          </p>
        </div>
      </HeroFrame>

      <section className="bg-ink px-1.5 sm:px-2 pt-1.5 sm:pt-2 pb-[clamp(48px,7vw,96px)]">
        <div className="columns-2 md:columns-3 xl:columns-4 gap-1.5 sm:gap-2">
          {galleryPhotos.map((p, i) => (
            <Image
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              priority={i < 4}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="block w-full h-auto mb-1.5 sm:mb-2 break-inside-avoid"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

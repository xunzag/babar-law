"use client";

import Image from "next/image";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { galleryPhotos } from "@/lib/content";

function Strip({ photos, reverse }: { photos: typeof galleryPhotos; reverse?: boolean }) {
  const track = [...photos, ...photos];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex w-max gap-3 pr-3 ${
          reverse ? "animate-[marqueeReverse_70s_linear_infinite]" : "animate-[marquee_70s_linear_infinite]"
        }`}
      >
        {track.map((p, i) => (
          <div key={p.src + i} className="relative h-[clamp(140px,18vw,230px)] aspect-[4/3] shrink-0 overflow-hidden">
            <Image src={p.src} alt="" fill sizes="320px" className="object-cover grayscale-[0.35] hover:grayscale-0 transition-[filter] duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryHero() {
  const half = Math.ceil(galleryPhotos.length / 2);
  return (
    <HeroFrame crumb="Gallery" index={`${galleryPhotos.length} photographs`} className="pb-0">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end mb-[clamp(40px,6vw,72px)]">
        <SplitWords
          text="In practice, and abroad."
          accent={["abroad."]}
          className="font-display font-medium text-white text-[clamp(46px,8vw,120px)] leading-[0.92] tracking-[-0.05em]"
        />
        <FadeIn delay={0.6}>
          <p className="text-cream/60 text-[16px] leading-[1.6] max-w-[340px] m-0">
            From the courts and offices of Karachi to meetings in New York, Brussels and Toronto.
          </p>
        </FadeIn>
      </div>
      <FadeIn delay={0.4} className="grid gap-3 -mx-[clamp(16px,4vw,40px)] [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Strip photos={galleryPhotos.slice(0, half)} />
        <Strip photos={galleryPhotos.slice(half)} reverse />
      </FadeIn>
    </HeroFrame>
  );
}

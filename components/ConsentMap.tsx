"use client";

import { saveConsent, useConsent } from "@/lib/consent";

// Google Maps embed that only loads once embedded content is allowed,
// because Google sets its own cookies when the map renders.
export default function ConsentMap({ src, title, directions }: { src: string; title: string; directions: string }) {
  const consent = useConsent();

  if (consent?.embeds) {
    return (
      <iframe
        src={src}
        width="600"
        height="360"
        style={{ border: 0 }}
        className="w-full h-[300px] sm:h-[360px] block grayscale-[0.3] contrast-105"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    );
  }

  return (
    <div className="h-[300px] sm:h-[360px] flex flex-col items-center justify-center gap-5 px-6 text-center bg-ink-3">
      <p className="m-0 max-w-[420px] text-cream/65 text-[14.5px] leading-relaxed">
        The map is provided by Google, which sets cookies when it loads. Load it here, or open the location in Google
        Maps.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => saveConsent({ embeds: true })}
          className="bg-gold text-ink px-5 py-3 text-[13.5px] font-medium cursor-pointer hover:bg-gold-light transition-colors"
        >
          Load map
        </button>
        <a
          href={directions}
          target="_blank"
          rel="noopener"
          className="border border-cream/20 text-cream px-5 py-3 text-[13.5px] font-medium hover:border-cream/50 hover:text-cream"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { firm } from "@/lib/content";
import { track } from "@/lib/analytics";

const STARS = [1, 2, 3, 4, 5];

function Star({ on, size }: { on: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="block">
      <path
        d="M12 2.6l2.82 5.72 6.31.92-4.57 4.45 1.08 6.29L12 17.01l-5.64 2.97 1.08-6.29L2.87 9.24l6.31-.92L12 2.6z"
        className={`transition-[fill,stroke] duration-300 ${on ? "fill-gold stroke-gold" : "fill-transparent stroke-current"}`}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Outline stars that light up under the pointer (and sweep once when first
 * seen). They are an invitation, not a rating: nothing is shown as filled at
 * rest, and every star opens the same Google review page.
 */
function StarRow({ size, placement, tone }: { size: number; placement: string; tone: "light" | "dark" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(0);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timers = [...STARS.map((n) => window.setTimeout(() => setSweep(n), 300 + n * 110)), window.setTimeout(() => setSweep(0), 1500)];
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const lit = hover || sweep;
  return (
    <a
      ref={ref}
      href={firm.review}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leave a review for Babar Law Associates on Google"
      onClick={() => track("review_click", { placement })}
      onMouseLeave={() => setHover(0)}
      className={`inline-flex gap-[clamp(4px,1vw,10px)] ${tone === "light" ? "text-ink/30" : "text-cream/30"}`}
    >
      {STARS.map((n) => (
        <span
          key={n}
          onMouseEnter={() => setHover(n)}
          className="transition-transform duration-300 ease-out-expo"
          style={{ transform: n <= lit ? "scale(1.08)" : undefined }}
        >
          <Star on={n <= lit} size={size} />
        </span>
      ))}
    </a>
  );
}

function GoogleButton({ placement, href, event, label, variant }: { placement: string; href: string; event: string; label: string; variant: "gold" | "dark" | "outlineDark" | "outline" }) {
  const styles = {
    gold: "bg-gold text-ink hover:bg-gold-light hover:text-ink",
    dark: "bg-ink text-paper hover:bg-graphite hover:text-paper",
    outlineDark: "border border-ink/25 text-ink hover:border-ink hover:text-ink",
    outline: "border border-cream/25 text-cream hover:border-gold hover:text-gold-light",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event, { placement })}
      className={`group/btn inline-flex items-center justify-between gap-3 py-4 pl-6.5 pr-5.5 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 ${styles[variant]}`}
    >
      <span>{label}</span>
      <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}

const read = (placement: string, variant: "dark" | "outline" | "outlineDark") => (
  <GoogleButton placement={placement} href={firm.reviews} event="reviews_open" label="Read reviews on Google" variant={variant} />
);
const write = (placement: string, variant: "gold" | "dark" | "outlineDark") => (
  <GoogleButton placement={placement} href={firm.review} event="review_click" label="Write a review" variant={variant} />
);

function QuoteIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden className="text-gold-deep shrink-0">
      <path fill="currentColor" d="M9.5 6C6.5 7.2 4.5 9.9 4.5 13.3V18h5.3v-5.2H7.4c.1-2 1.2-3.6 3.1-4.6L9.5 6zm9 0c-3 1.2-5 3.9-5 7.3V18h5.3v-5.2h-2.4c.1-2 1.2-3.6 3.1-4.6L18.5 6z" />
    </svg>
  );
}

/**
 * Homepage section. Reviews are written and published by clients on Google;
 * the site only points there (no quotes or ratings are shown here).
 */
export function ReviewSection() {
  const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";
  return (
    <section className="bg-paper text-ink border-t border-ink/8">
      <div className={`${wrap} py-[clamp(80px,11vw,150px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(40px,6vw,96px)] items-center`}>
        <div>
          <div className="eyebrow text-gold-deep! mb-6">Client reviews</div>
          <h2 className="m-0 mb-6 font-display font-medium text-[clamp(36px,5vw,68px)] leading-[1.02] tracking-[-0.04em]">
            In our clients&rsquo;
            <br />
            own words.
            <span className="block text-ink/40">On Google.</span>
          </h2>
          <p className="m-0 max-w-[520px] text-ink/70 text-[17px] leading-[1.8]">
            Reviews of Babar Law Associates are written by clients and published on Google, not on this website.
            Read them there, and if we have helped you, add your own.
          </p>
        </div>

        <div className="relative bg-white/70 border border-ink/10 shadow-[0_30px_80px_-40px_rgba(10,12,18,0.35)]">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gold" aria-hidden />
          {/* Read */}
          <div className="p-[clamp(26px,3.6vw,44px)]">
            <div className="flex items-start gap-5">
              <QuoteIcon />
              <div className="min-w-0">
                <div className="text-[12px] font-medium tracking-[0.2em] uppercase text-ink/50 mb-2">Considering us?</div>
                <p className="m-0 text-[clamp(19px,1.7vw,22px)] leading-[1.4] tracking-[-0.01em] font-medium">
                  See what clients say about the chambers.
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              {read("home", "dark")}
              <span className="flex items-center gap-2 text-[13.5px] text-ink/55">
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden className="text-gold-deep">
                  <path fill="currentColor" d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                </svg>
                Saddar, Karachi · Google Maps
              </span>
            </div>
          </div>
          {/* Write */}
          <div className="border-t border-ink/10 bg-paper-2/50 p-[clamp(26px,3.6vw,44px)]">
            <div className="text-[12px] font-medium tracking-[0.2em] uppercase text-ink/50 mb-4">Already a client?</div>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <StarRow size={40} placement="home" tone="light" />
              {write("home", "outlineDark")}
            </div>
            <p className="m-0 mt-5 text-[12.5px] text-ink/45">Opens Google in a new tab. Please don&apos;t include details of your case.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Compact strip for the contact page. */
export function ReviewStrip() {
  return (
    <div className="border border-gold/25 bg-ink-4 px-[clamp(22px,3vw,36px)] py-[clamp(22px,3vw,30px)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <div className="text-white text-[17px] font-medium">Client reviews on Google</div>
        <div className="text-cream/60 text-[14.5px]">Read what clients say, or leave a review of your own.</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {read("contact", "outline")}
        {write("contact", "gold")}
      </div>
    </div>
  );
}

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

function GoogleButton({ placement, dark }: { placement: string; dark?: boolean }) {
  return (
    <a
      href={firm.review}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("review_click", { placement })}
      className={`group/btn inline-flex items-center gap-3 py-4 pl-6.5 pr-5.5 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 ${
        dark ? "bg-ink text-paper hover:bg-graphite hover:text-paper" : "bg-gold text-ink hover:bg-gold-light hover:text-ink"
      }`}
    >
      <span>Write a review on Google</span>
      <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}

/** Full homepage section. */
export function ReviewSection() {
  const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";
  return (
    <section className="bg-paper text-ink border-t border-ink/8">
      <div className={`${wrap} py-[clamp(80px,11vw,150px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(40px,6vw,96px)] items-center`}>
        <div>
          <div className="eyebrow text-gold-deep! mb-6">Client reviews</div>
          <h2 className="m-0 mb-6 font-display font-medium text-[clamp(36px,5vw,68px)] leading-[1.02] tracking-[-0.04em]">
            Worked with us?
            <br />
            <span className="text-ink/45">Tell others.</span>
          </h2>
          <p className="m-0 max-w-[520px] text-ink/70 text-[17px] leading-[1.8]">
            If Mr. Babar or the chambers have helped you, a few honest words on Google help others facing the same
            situation find counsel they can trust. It takes about a minute.
          </p>
        </div>

        <div className="relative bg-white/70 border border-ink/10 p-[clamp(28px,4vw,52px)] shadow-[0_30px_80px_-40px_rgba(10,12,18,0.35)]">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gold" aria-hidden />
          <div className="text-[12px] font-medium tracking-[0.2em] uppercase text-ink/50 mb-5">Rate your experience</div>
          <StarRow size={52} placement="home" tone="light" />
          <div className="mt-8 pt-7 border-t border-ink/10 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-gold-deep shrink-0">
                <path fill="currentColor" d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
              </svg>
              <span className="text-[14.5px] leading-snug">
                <a href={firm.maps} target="_blank" rel="noopener noreferrer" className="text-ink font-medium hover:text-gold-deep">
                  Babar Law Associates
                </a>
                <span className="block text-ink/55">Saddar, Karachi · on Google</span>
              </span>
            </div>
            <GoogleButton placement="home" dark />
          </div>
          <p className="m-0 mt-5 text-[12.5px] text-ink/45">Opens Google in a new tab. Please don&apos;t include details of your case.</p>
        </div>
      </div>
    </section>
  );
}

/** Compact strip for the contact page. */
export function ReviewStrip() {
  return (
    <div className="border border-gold/25 bg-ink-4 px-[clamp(22px,3vw,36px)] py-[clamp(22px,3vw,30px)] flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
        <StarRow size={30} placement="contact" tone="dark" />
        <div>
          <div className="text-white text-[17px] font-medium">Already a client?</div>
          <div className="text-cream/60 text-[14.5px]">A short review on Google helps others find us.</div>
        </div>
      </div>
      <GoogleButton placement="contact" />
    </div>
  );
}

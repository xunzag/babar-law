import Link from "next/link";
import type { ReactNode } from "react";
import HeroFrame from "@/components/heroes/HeroFrame";

export type LegalSection = { id: string; heading: string; body: ReactNode };

export const LAST_UPDATED = "26 September 2026";

const others = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookies", label: "Cookie policy" },
  { href: "/terms", label: "Terms of use & disclaimer" },
];

// Long-form legal document: plain hero, sticky contents list, readable measure.
export default function LegalPage({
  crumb,
  title,
  intro,
  sections,
  current,
}: {
  crumb: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  current: string;
}) {
  return (
    <div>
      <HeroFrame crumb={crumb}>
        <h1 className="m-0 font-display font-medium text-white text-[clamp(40px,6.4vw,88px)] leading-[0.98] tracking-[-0.045em] mb-6">
          {title}
        </h1>
        <p className="m-0 text-cream/55 text-[14.5px]">Last updated {LAST_UPDATED}</p>
      </HeroFrame>

      <div className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(56px,8vw,110px)] grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-x-[clamp(40px,6vw,96px)] gap-y-10">
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="eyebrow text-gold-deep! mb-4">Contents</div>
            <nav className="grid gap-2 mb-10">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-[14px] text-ink/65 hover:text-ink w-fit">
                  {s.heading}
                </a>
              ))}
            </nav>
            <div className="hidden lg:grid gap-2 border-t border-ink/12 pt-6">
              {others
                .filter((o) => o.href !== current)
                .map((o) => (
                  <Link key={o.href} href={o.href} className="text-[13.5px] text-gold-deep hover:text-ink w-fit">
                    {o.label} →
                  </Link>
                ))}
            </div>
          </aside>

          <article className="max-w-[760px] text-[16.5px] leading-[1.8] text-ink/80 [&_p]:m-0 [&_p+p]:mt-4 [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mt-1.5 [&_a]:text-gold-deep [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink [&_strong]:font-medium">
            <div className="text-[18.5px] leading-[1.75] text-ink mb-12">{intro}</div>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-ink/12 pt-8 pb-10">
                <h2 className="m-0 mb-4 font-display font-medium text-[clamp(22px,2.4vw,28px)] leading-tight tracking-[-0.02em] text-ink">
                  {s.heading}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}

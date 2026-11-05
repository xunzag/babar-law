import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HeroFrame from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import Reveal from "@/components/Reveal";
import ArrowLink from "@/components/ArrowLink";
import PracticeIcon from "@/components/PracticeIcon";
import JsonLd from "@/components/JsonLd";
import { practiceBySlug, practicePages } from "@/lib/practice";
import { breadcrumbLd, pageMeta, siteUrl } from "@/lib/site";
import { callLines, firm } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return practicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/practice-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = practiceBySlug(slug);
  if (!p) return {};
  return pageMeta({ title: p.seoTitle, description: p.description, path: `/practice-areas/${p.slug}` });
}

const steps = [
  ["Send a short summary", "Through the enquiry form, WhatsApp or email, with your country of residence and any deadline."],
  ["Initial assessment", "Mr. Babar reviews the matter personally and replies, usually within one business day."],
  ["Scope and fees", "Where the firm can act, you receive a scope of work and fee basis before anything begins."],
];

export default async function PracticePage({ params }: PageProps<"/practice-areas/[slug]">) {
  const { slug } = await params;
  const p = practiceBySlug(slug);
  if (!p) notFound();
  const related = p.related.map((r) => practiceBySlug(r)!).filter(Boolean);
  const path = `/practice-areas/${p.slug}`;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: p.title,
          serviceType: p.title,
          description: p.description,
          url: `${siteUrl}${path}`,
          provider: { "@id": `${siteUrl}/#firm` },
          areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "European Union", "United Arab Emirates"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: p.title,
            itemListElement: p.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Practice areas", path: "/practice-areas" },
          { name: p.title, path },
        ])}
      />

      <HeroFrame crumb={p.title}>
        <div className="max-w-[900px]">
          <div className="fade-rise flex items-center gap-3 mb-6">
            <span className="w-11 h-11 border border-gold/40 flex items-center justify-center">
              <PracticeIcon num={p.num} className="w-5 h-5 text-gold" />
            </span>
            <Link href="/practice-areas" className="text-[13px] text-cream/60 hover:text-white">
              Practice areas
            </Link>
          </div>
          <SplitWords
            text={`${p.title}.`}
            className="font-display font-medium text-white text-[clamp(40px,6.4vw,92px)] leading-[0.96] tracking-[-0.045em] mb-7"
          />
          <p className="fade-rise m-0 text-cream/75 text-[clamp(16px,1.6vw,20px)] leading-[1.6] max-w-[720px]">{p.lead}</p>
        </div>
      </HeroFrame>

      <section className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(56px,8vw,110px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-x-[clamp(40px,6vw,96px)] gap-y-12">
          <div className="max-w-[760px]">
            <Reveal>
              {p.body.map((para) => (
                <p key={para.slice(0, 24)} className="m-0 mb-5 text-[17px] leading-[1.8] text-ink/80">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="m-0 mb-6 font-display font-medium text-[clamp(26px,3vw,36px)] leading-tight">
                What we handle
              </h2>
              <ul className="m-0 p-0 list-none grid sm:grid-cols-2 gap-x-8 border-t border-ink/12">
                {p.services.map((s) => (
                  <li key={s} className="flex gap-3 py-3.5 border-b border-ink/12 text-[15.5px] leading-snug">
                    <span className="mt-2 w-3 h-px bg-gold-deep shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 mb-0 text-[15px] text-ink/65 leading-relaxed">
                <strong className="font-medium text-ink">Who we act for:</strong> {p.forWhom}
              </p>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="m-0 mb-6 font-display font-medium text-[clamp(26px,3vw,36px)] leading-tight">
                How an engagement begins
              </h2>
              <ol className="m-0 p-0 list-none grid gap-4">
                {steps.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3">
                    <span className="w-9 h-9 rounded-full bg-ink text-gold flex items-center justify-center text-[14px] font-medium">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[16px] font-medium">{t}</span>
                      <span className="block text-[15px] text-ink/65 leading-relaxed">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 self-start grid gap-5">
            <div className="bg-ink text-cream p-7">
              <h2 className="m-0 mb-3 font-display font-medium text-[24px] leading-tight text-white">Discuss your matter</h2>
              <p className="m-0 mb-6 text-[14.5px] leading-relaxed text-cream/70">
                Consultations in Karachi, by appointment in New York, and remotely worldwide.
              </p>
              <div className="grid gap-2.5">
                <ArrowLink href="/contact" className="justify-between">
                  Send an enquiry
                </ArrowLink>
                <ArrowLink href={firm.whatsapp} external variant="outline" className="justify-between">
                  WhatsApp
                </ArrowLink>
              </div>
              <div className="mt-6 pt-5 border-t border-cream/10 grid gap-1.5 text-[14px]">
                {callLines.slice(0, 3).map((c) => (
                  <a key={c.href} href={c.href} className="flex justify-between gap-4 py-1 text-cream/80 hover:text-white">
                    <span className="text-cream/55">{c.label}</span>
                    <span className="tabular-nums">{c.number}</span>
                  </a>
                ))}
              </div>
            </div>
            {related.length > 0 && (
              <div className="border border-ink/12 p-7">
                <div className="eyebrow text-gold-deep! mb-4">Related practice areas</div>
                <ul className="m-0 p-0 list-none grid gap-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/practice-areas/${r.slug}`} className="text-[15.5px] text-ink hover:text-gold-deep">
                        {r.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

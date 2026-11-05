import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SplitWords from "@/components/motion/SplitWords";
import { FadeIn } from "@/components/heroes/HeroFrame";
import Reveal from "@/components/Reveal";
import ArrowLink from "@/components/ArrowLink";
import JsonLd from "@/components/JsonLd";
import ArticleToc from "@/components/ArticleToc";
import { articleBySlug, articles, formatDate, type Block } from "@/lib/insights";
import { practiceBySlug } from "@/lib/practice";
import { breadcrumbLd, pageMeta, siteUrl } from "@/lib/site";
import { firm, principal } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  const meta = pageMeta({ title: a.seoTitle, description: a.description, path: `/insights/${a.slug}` });
  return {
    ...meta,
    authors: [{ name: principal.name, url: "/about" }],
    openGraph: { ...meta.openGraph, type: "article", publishedTime: a.date, modifiedTime: a.updated ?? a.date, authors: [principal.name] },
  };
}

const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Body({ blocks }: { blocks: Block[] }) {
  const lead = blocks.findIndex((b) => b.type === "p");
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2
              key={i}
              id={slugify(b.text)}
              className="scroll-mt-28 mt-16 mb-5 pt-10 border-t border-ink/10 font-display font-medium text-[clamp(25px,2.6vw,32px)] leading-[1.15] tracking-[-0.025em] text-ink"
            >
              {b.text}
            </h2>
          );
        if (b.type === "list")
          return (
            <ul key={i} className="my-6 p-0 list-none grid gap-3.5">
              {b.items.map((t) => (
                <li key={t} className="relative pl-7 text-[17.5px] leading-[1.75] text-ink/80">
                  <span className="absolute left-0 top-[0.8em] w-3.5 h-px bg-gold-deep" />
                  {t}
                </li>
              ))}
            </ul>
          );
        if (b.type === "steps")
          return (
            <ol key={i} className="my-8 p-0 list-none grid gap-px bg-ink/10 border border-ink/10">
              {b.items.map((s, n) => (
                <li key={s.title} className="bg-paper grid grid-cols-[44px_minmax(0,1fr)] gap-4 p-[clamp(18px,2.4vw,26px)]">
                  <span className="font-display font-medium text-[26px] leading-none text-gold-deep tabular-nums pt-0.5">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[17.5px] font-medium text-ink mb-1.5">{s.title}</span>
                    <span className="block text-[16.5px] leading-[1.7] text-ink/70">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          );
        if (i === lead)
          return (
            <p key={i} className="mt-0 mb-7 text-[clamp(19px,1.7vw,22px)] leading-[1.65] text-ink/90 tracking-[-0.005em]">
              {b.text}
            </p>
          );
        return (
          <p key={i} className="my-6 text-[17.5px] leading-[1.85] text-ink/80">
            {b.text}
          </p>
        );
      })}
    </>
  );
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const practice = practiceBySlug(a.practice);
  const others = articles.filter((x) => x.slug !== a.slug);
  const url = `${siteUrl}/insights/${a.slug}`;
  const toc = a.body.flatMap((b) => (b.type === "h2" ? [{ id: slugify(b.text), text: b.text }] : []));

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          image: `${siteUrl}${a.image}`,
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          mainEntityOfPage: url,
          articleSection: a.category,
          author: { "@type": "Person", "@id": `${siteUrl}/#principal`, name: principal.name, url: `${siteUrl}/about` },
          publisher: { "@id": `${siteUrl}/#firm` },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Insights", path: "/insights" },
          { name: a.title, path: `/insights/${a.slug}` },
        ])}
      />

      {/* Header */}
      <header className="relative bg-ink">
        <div className="max-w-[920px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(120px,15vw,176px)] pb-[clamp(120px,16vw,220px)] text-center">
          <nav aria-label="Breadcrumb" className="fade-rise flex flex-wrap justify-center items-center gap-2.5 text-[12.5px] mb-8">
            <Link href="/" className="text-cream/70 hover:text-white">Home</Link>
            <span className="text-cream/40">/</span>
            <Link href="/insights" className="text-cream/70 hover:text-white">Insights</Link>
          </nav>
          <div className="fade-rise eyebrow text-gold! mb-6" style={{ "--d": "0.1s" } as React.CSSProperties}>
            {a.category}
          </div>
          <SplitWords
            text={a.title}
            stagger={0.04}
            className="font-display font-medium text-white text-[clamp(36px,5.6vw,76px)] leading-[1.02] tracking-[-0.04em] mb-7 justify-center"
          />
          <FadeIn delay={0.25}>
            <p className="m-0 mx-auto max-w-[640px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-cream/65 mb-9">{a.description}</p>
          </FadeIn>
          <FadeIn delay={0.35} className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 text-[14px] text-cream/70">
            <span className="flex items-center gap-3 text-left">
              <span className="relative w-10 h-10 rounded-full overflow-hidden bg-ink-4">
                <Image src={principal.image} alt="" fill sizes="40px" className="object-cover object-top" />
              </span>
              <span>
                <span className="block text-white">{principal.name}</span>
                <span className="block text-[12.5px] text-cream/55">Advocate High Court</span>
              </span>
            </span>
            <span className="hidden sm:block w-px h-8 bg-cream/15" />
            <span className="flex items-center gap-3">
              <time dateTime={a.date}>{formatDate(a.date)}</time>
              <span className="w-1 h-1 rounded-full bg-cream/30" />
              <span>{a.readMinutes} min read</span>
            </span>
          </FadeIn>
        </div>
      </header>

      <div className="bg-paper text-ink">
        {/* Cover image, overlapping the header */}
        <div className="max-w-[1200px] mx-auto px-[clamp(16px,4vw,40px)]">
          <figure className="m-0 -mt-[clamp(90px,13vw,180px)] relative">
            <div className="relative aspect-[16/9] overflow-hidden bg-ink-4 clip-up shadow-[0_30px_80px_-30px_rgba(10,12,18,0.45)]">
              <div className="settle absolute inset-0">
                <Image src={a.image} alt={a.imageAlt} fill priority sizes="(max-width: 1240px) 100vw, 1200px" className="object-cover" style={{ objectPosition: a.imagePos }} />
              </div>
            </div>
            <figcaption className="mt-3 text-[13px] text-ink/50">{a.imageAlt}</figcaption>
          </figure>
        </div>

        <div className="max-w-[1200px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(48px,6vw,80px)] pb-[clamp(64px,8vw,110px)] grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-x-[clamp(48px,6vw,96px)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 grid gap-10">
              <ArticleToc items={toc} />
              <div className="border-t border-ink/12 pt-6">
                <div className="text-[13.5px] leading-relaxed text-ink/60 mb-4">Questions about your own case?</div>
                <Link href="/contact" className="block text-[14px] font-medium text-ink hover:text-gold-deep mb-2">Send an enquiry →</Link>
                <a href={firm.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-[14px] font-medium text-ink hover:text-gold-deep">WhatsApp →</a>
              </div>
            </div>
          </aside>

          <div className="max-w-[700px] w-full">
            {/* Key points */}
            <Reveal className="border border-ink/12 bg-white/50 p-[clamp(22px,3vw,34px)] mb-12">
              <div className="eyebrow text-gold-deep! mb-5">In short</div>
              <ul className="m-0 p-0 list-none grid gap-3.5">
                {a.summary.map((s) => (
                  <li key={s} className="grid grid-cols-[22px_minmax(0,1fr)] text-[16.5px] leading-[1.6] text-ink/85">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-[5px] text-gold-deep" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Body blocks={a.body} />

            {/* Author */}
            <div className="mt-16 pt-10 border-t border-ink/12 grid grid-cols-[72px_minmax(0,1fr)] gap-5 items-start">
              <span className="relative w-[72px] h-[72px] rounded-full overflow-hidden bg-ink-4">
                <Image src={principal.image} alt="" fill sizes="72px" className="object-cover object-top" />
              </span>
              <div>
                <div className="text-[12px] tracking-[0.14em] uppercase text-ink/45 mb-1.5">Written by</div>
                <Link href="/about" className="font-display font-medium text-[21px] text-ink hover:text-gold-deep">{principal.name}</Link>
                <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink/65">
                  Advocate of the High Court of Sindh and Foreign Attorney in New York, with an Erasmus Mundus LLM
                  from Bologna and Ghent. In litigation and international practice since 2004.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-ink text-cream p-[clamp(26px,4vw,44px)] grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div>
                <h2 className="m-0 mb-2 font-display font-medium text-[clamp(22px,2.4vw,28px)] leading-tight text-white">Questions about your case?</h2>
                <p className="m-0 text-[15px] leading-relaxed text-cream/65">Send a short summary and Mr. Babar will review it personally.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ArrowLink href="/contact">Send an enquiry</ArrowLink>
                <ArrowLink href={firm.whatsapp} external variant="outline">WhatsApp</ArrowLink>
              </div>
            </div>

            {practice && (
              <Link href={`/practice-areas/${practice.slug}`} className="group mt-5 flex items-center justify-between gap-6 border border-ink/12 p-6 text-ink hover:border-ink/40 transition-colors">
                <span>
                  <span className="block eyebrow text-gold-deep! mb-2">Related practice area</span>
                  <span className="block font-display font-medium text-[19px] leading-tight group-hover:text-gold-deep transition-colors">{practice.title}</span>
                </span>
                <span className="text-[20px] text-ink/40 group-hover:text-gold-deep group-hover:translate-x-1 transition-all">→</span>
              </Link>
            )}

            <p className="mt-10 text-[13.5px] leading-relaxed text-ink/50">
              This guide is general information, not legal advice, and reflects our understanding at the date shown.
              Rules and procedures change; please take advice on your own circumstances before acting. Contacting us
              does not create an advocate–client relationship.
            </p>
          </div>
        </div>
      </div>

      {/* More insights */}
      <section className="bg-ink border-t border-cream/8">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(56px,8vw,100px)]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <h2 className="m-0 font-display font-medium text-white text-[clamp(28px,3.6vw,44px)] leading-[1.05]">More insights</h2>
            <ArrowLink href="/insights" variant="outline">All insights</ArrowLink>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map((o) => (
              <Link key={o.slug} href={`/insights/${o.slug}`} className="group relative block aspect-[16/9] overflow-hidden bg-ink-3 text-cream">
                <Image src={o.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]" style={{ objectPosition: o.imagePos }} />
                <span className="absolute inset-0 bg-ink/60 group-hover:bg-ink/50 transition-colors duration-500" />
                <span className="absolute inset-x-0 bottom-0 p-[clamp(20px,3vw,32px)]">
                  <span className="block text-[12px] font-medium tracking-[0.14em] uppercase text-gold-light mb-2">{o.category}</span>
                  <span className="block font-display font-medium text-white text-[clamp(22px,2.4vw,30px)] leading-[1.12] tracking-[-0.025em]">{o.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

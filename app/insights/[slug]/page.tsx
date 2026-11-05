import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SplitWords from "@/components/motion/SplitWords";
import { FadeIn } from "@/components/heroes/HeroFrame";
import Reveal from "@/components/Reveal";
import ArrowLink from "@/components/ArrowLink";
import JsonLd from "@/components/JsonLd";
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

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} className="mt-12 mb-4 font-display font-medium text-[clamp(24px,2.6vw,32px)] leading-[1.15] tracking-[-0.025em] text-ink">
              {b.text}
            </h2>
          );
        if (b.type === "list")
          return (
            <ul key={i} className="my-5 p-0 list-none grid gap-3">
              {b.items.map((t) => (
                <li key={t} className="flex gap-3.5 text-[17px] leading-[1.7] text-ink/80">
                  <span className="mt-3 w-3 h-px bg-gold-deep shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          );
        if (b.type === "steps")
          return (
            <ol key={i} className="my-7 p-0 list-none border-l border-ink/15 ml-4 grid gap-6">
              {b.items.map((s, n) => (
                <li key={s.title} className="relative pl-8">
                  <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-ink text-gold flex items-center justify-center text-[13px] font-medium">
                    {n + 1}
                  </span>
                  <span className="block text-[17px] font-medium text-ink mb-1">{s.title}</span>
                  <span className="block text-[16px] leading-[1.7] text-ink/70">{s.text}</span>
                </li>
              ))}
            </ol>
          );
        return (
          <p key={i} className="my-5 text-[17.5px] leading-[1.8] text-ink/80">
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
      <header className="relative bg-ink overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(112px,14vw,156px)] pb-[clamp(40px,6vw,72px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(32px,5vw,80px)] items-end">
          <div>
            <nav aria-label="Breadcrumb" className="fade-rise flex flex-wrap items-center gap-2.5 text-[12.5px] mb-10">
              <Link href="/" className="text-cream/70 hover:text-white">Home</Link>
              <span className="text-cream/50">/</span>
              <Link href="/insights" className="text-cream/70 hover:text-white">Insights</Link>
              <span className="text-cream/50">/</span>
              <span className="text-gold-light">{a.category}</span>
            </nav>
            <SplitWords
              text={a.title}
              stagger={0.04}
              className="font-display font-medium text-white text-[clamp(36px,5.2vw,72px)] leading-[1.0] tracking-[-0.04em] mb-7"
            />
            <FadeIn delay={0.3} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-cream/70">
              <span className="flex items-center gap-3">
                <span className="relative w-10 h-10 rounded-full overflow-hidden bg-ink-4">
                  <Image src={principal.image} alt="" fill sizes="40px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="block text-white">{principal.name}</span>
                  <span className="block text-[12.5px] text-cream/55">Advocate High Court</span>
                </span>
              </span>
              <span className="hidden sm:inline text-cream/30">|</span>
              <span className="flex items-center gap-3 w-full sm:w-auto">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span className="text-cream/30">|</span>
                <span>{a.readMinutes} min read</span>
              </span>
            </FadeIn>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-ink-4 clip-up">
            <div className="settle absolute inset-0">
              <Image src={a.image} alt={a.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" style={{ objectPosition: a.imagePos }} />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(48px,7vw,96px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-x-[clamp(40px,6vw,96px)] gap-y-12">
          <div className="max-w-[740px]">
            {/* Key points */}
            <Reveal className="bg-paper-2/70 border-l-2 border-gold-deep p-[clamp(20px,3vw,32px)] mb-10">
              <div className="eyebrow text-gold-deep! mb-4">In short</div>
              <ul className="m-0 p-0 list-none grid gap-3">
                {a.summary.map((s) => (
                  <li key={s} className="flex gap-3 text-[16px] leading-[1.6] text-ink/85">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold-deep shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Body blocks={a.body} />

            <p className="mt-12 pt-6 border-t border-ink/12 text-[14px] leading-relaxed text-ink/60">
              This guide is general information, not legal advice, and reflects our understanding at the date shown.
              Rules and procedures change; please take advice on your own circumstances before acting. Contacting us
              does not create an advocate–client relationship.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 self-start grid gap-5">
            <div className="bg-ink text-cream p-7">
              <h2 className="m-0 mb-3 font-display font-medium text-[22px] leading-tight text-white">Questions about your case?</h2>
              <p className="m-0 mb-6 text-[14.5px] leading-relaxed text-cream/70">
                Send a short summary and Mr. Babar will review it personally.
              </p>
              <div className="grid gap-2.5">
                <ArrowLink href="/contact" className="justify-between">Send an enquiry</ArrowLink>
                <ArrowLink href={firm.whatsapp} external variant="outline" className="justify-between">WhatsApp</ArrowLink>
              </div>
            </div>
            {practice && (
              <Link href={`/practice-areas/${practice.slug}`} className="group block border border-ink/12 p-7 text-ink hover:border-ink/40 transition-colors">
                <div className="eyebrow text-gold-deep! mb-3">Practice area</div>
                <div className="font-display font-medium text-[20px] leading-tight mb-2 group-hover:text-gold-deep transition-colors">{practice.title} →</div>
                <p className="m-0 text-[14px] leading-relaxed text-ink/60">{practice.lead}</p>
              </Link>
            )}
          </aside>
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

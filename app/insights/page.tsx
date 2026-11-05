import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroFrame from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import JsonLd from "@/components/JsonLd";
import { articles, formatDate } from "@/lib/insights";
import { breadcrumbLd, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Insights: Immigration, Golden Visa & Pakistani Law Explained",
  description:
    "Plain-language guides from Babar Law Associates, Karachi: Golden Visa and residency by investment, bail and litigation in Sindh, and visas for the UK, US, Canada and Europe.",
  path: "/insights",
});

export default function InsightsPage() {
  const [lead, ...rest] = articles;
  return (
    <div>
      <JsonLd data={breadcrumbLd([{ name: "Insights", path: "/insights" }])} />
      <HeroFrame crumb="Insights">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SplitWords
            text="Insights."
            className="m-0 font-display font-medium text-white text-[clamp(52px,9vw,136px)] leading-[0.9] tracking-[-0.05em]"
          />
          <p className="fade-rise m-0 max-w-[460px] text-cream/65 text-[clamp(15px,1.4vw,18px)] leading-[1.6]">
            Plain-language guides to the matters we handle, from Golden Visa programmes to bail before the courts of
            Sindh.
          </p>
        </div>
      </HeroFrame>

      <section className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(56px,8vw,110px)]">
          {/* Lead article */}
          <Link href={`/insights/${lead.slug}`} className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-x-12 gap-y-7 items-center text-ink mb-[clamp(56px,7vw,96px)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-2 clip-up">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                style={{ objectPosition: lead.imagePos }}
              />
            </div>
            <div className="fade-rise">
              <div className="eyebrow text-gold-deep! mb-4">
                {lead.category} · {lead.readMinutes} min read
              </div>
              <h2 className="m-0 mb-5 font-display font-medium text-[clamp(30px,3.8vw,50px)] leading-[1.04] group-hover:text-gold-deep transition-colors">
                {lead.title}
              </h2>
              <p className="m-0 mb-6 text-[17px] leading-[1.7] text-ink/70">{lead.description}</p>
              <span className="inline-flex items-center gap-2 text-[14px] font-medium border-b border-ink/30 pb-1 group-hover:border-ink">
                Read the guide <span aria-hidden>→</span>
              </span>
            </div>
          </Link>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 border-t border-ink/12 pt-[clamp(40px,5vw,64px)]">
            {rest.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/insights/${a.slug}`} className="group block text-ink">
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-2 mb-6">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                      style={{ objectPosition: a.imagePos }}
                    />
                  </div>
                  <div className="eyebrow text-gold-deep! mb-3">
                    {a.category} · {a.readMinutes} min read
                  </div>
                  <h2 className="m-0 mb-3 font-display font-medium text-[clamp(24px,2.6vw,34px)] leading-[1.1] group-hover:text-gold-deep transition-colors">
                    {a.title}
                  </h2>
                  <p className="m-0 mb-4 text-[15.5px] leading-relaxed text-ink/65">{a.description}</p>
                  <span className="text-[13px] text-ink/55">{formatDate(a.date)}</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}

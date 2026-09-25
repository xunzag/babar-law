import Image from "next/image";
import Reveal from "@/components/Reveal";
import AssociatesHero from "@/components/heroes/AssociatesHero";
import MemberCard from "@/components/MemberCard";
import ArrowLink from "@/components/ArrowLink";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { associates, principal, teamGroups } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Associates",
  description:
    "The chambers of Babar Law Associates: partners, Advocates of the High Court, advocates and court staff in Karachi.",
  alternates: { canonical: "/associates" },
};

const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";

export default function AssociatesPage() {
  const total = associates.length + 1;
  const partner = associates.find((a) => a.group === "partners")!;
  // Anchor ids match the hero's monogram wall: principal first, then members in order.
  const anchorOf = (name: string) => `member-${associates.findIndex((a) => a.name === name) + 1}`;

  return (
    <div>
      <AssociatesHero />

      {/* Partners */}
      <section className="bg-paper text-ink">
        <div className={`${wrap} pt-[clamp(72px,10vw,130px)] pb-[clamp(48px,6vw,80px)]`}>
          <Reveal className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <div className="eyebrow text-gold-deep! flex items-center gap-3 mb-5">
                <span>01</span>
                <span className="w-8 h-px bg-gold-deep/60" />
                <span>{teamGroups[0].label}</span>
              </div>
              <h2 className="m-0 font-display font-medium text-[clamp(32px,5vw,58px)] leading-[1.02]">
                Leading the practice.
              </h2>
            </div>
            <p className="m-0 max-w-[380px] text-ink/60 text-[15.5px] leading-relaxed">{teamGroups[0].blurb}</p>
          </Reveal>

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-5">
            <Reveal>
              <article
                id="principal"
                className="scroll-mt-28 group relative bg-ink text-cream overflow-hidden grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] h-full"
              >
                <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[460px] overflow-hidden">
                  <Image
                    src={principal.image}
                    alt={`${principal.name} at his desk, Karachi`}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="p-[clamp(22px,3vw,40px)] flex flex-col justify-between gap-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] text-cream/40">01 / {String(total).padStart(2, "0")}</span>
                    <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase bg-gold text-ink px-2 py-1">
                      {principal.role}
                    </span>
                  </div>
                  <div>
                    <h3 className="m-0 font-display font-medium text-white text-[clamp(28px,3.2vw,42px)] leading-[1.02] tracking-[-0.035em] mb-3">
                      {principal.name}
                    </h3>
                    <p className="text-gold-light text-[15px] mb-7">{principal.designation}</p>
                    <ArrowLink href="/about" variant="outline">
                      Full profile
                    </ArrowLink>
                  </div>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full [&>article]:aspect-auto [&>article]:h-full [&>article]:min-h-[380px]">
                <MemberCard member={partner} index={2} total={total} anchor={anchorOf(partner.name)} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Remaining groups */}
      {teamGroups.slice(1).map((g, gi) => {
        const members = associates.filter((a) => a.group === g.id);
        return (
          <section key={g.id} className="bg-paper text-ink">
            <div className={`${wrap} py-[clamp(48px,6vw,80px)] border-t border-ink/12 grid lg:grid-cols-[300px_minmax(0,1fr)] gap-x-[clamp(32px,5vw,80px)] gap-y-10`}>
              <Reveal className="lg:sticky lg:top-28 self-start">
                <div className="eyebrow text-gold-deep! flex items-center gap-3 mb-5">
                  <span>{String(gi + 2).padStart(2, "0")}</span>
                  <span className="w-8 h-px bg-gold-deep/60" />
                  <span>{String(members.length).padStart(2, "0")} members</span>
                </div>
                <h2 className="m-0 font-display font-medium text-[clamp(28px,3.2vw,40px)] leading-[1.05] mb-4">
                  {g.label}
                </h2>
                <p className="m-0 text-ink/60 text-[15px] leading-relaxed">{g.blurb}</p>
              </Reveal>
              <Stagger className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                {members.map((m) => {
                  const idx = associates.indexOf(m) + 2;
                  return (
                    <StaggerItem key={m.name}>
                      <MemberCard member={m} index={idx} total={total} anchor={anchorOf(m.name)} />
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </section>
        );
      })}

      {/* Join / instruct */}
      <section className="bg-paper-2 text-ink border-t border-ink/10">
        <Reveal className={`${wrap} py-[clamp(56px,8vw,96px)] grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center`}>
          <div>
            <div className="eyebrow text-gold-deep! mb-4">Instructing the chambers</div>
            <p className="m-0 font-display font-medium text-[clamp(24px,3vw,38px)] leading-[1.15] tracking-[-0.03em] max-w-[820px]">
              Have a matter before the courts of Pakistan? Send a short summary and the chambers will respond.
            </p>
          </div>
          <ArrowLink href="/contact" variant="dark">
            Start an enquiry
          </ArrowLink>
        </Reveal>
      </section>
    </div>
  );
}

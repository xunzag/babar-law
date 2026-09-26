import Image from "next/image";
import Link from "next/link";
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

// Anchor ids are shared with the hero wall and the homepage roster.
const anchorOf = (name: string) => `member-${associates.findIndex((a) => a.name === name) + 1}`;

function GroupHead({ label, blurb, count }: { label: string; blurb: string; count: number }) {
  return (
    <Reveal className="lg:sticky lg:top-28 self-start">
      <div className="eyebrow text-gold-deep! mb-4">
        {count} {count === 1 ? "member" : "members"}
      </div>
      <h2 className="m-0 font-display font-medium text-[clamp(28px,3.2vw,40px)] leading-[1.05] mb-4">{label}</h2>
      <p className="m-0 text-ink/60 text-[15px] leading-relaxed max-w-[320px]">{blurb}</p>
    </Reveal>
  );
}

export default function AssociatesPage() {
  const partner = associates.find((a) => a.group === "partners")!;
  const [partners, ...rest] = teamGroups;

  return (
    <div>
      <AssociatesHero />

      <div className="bg-paper text-ink">
        {/* Partners */}
        <section className={`${wrap} py-[clamp(64px,9vw,120px)] grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-x-[clamp(32px,5vw,80px)] gap-y-10`}>
          <GroupHead label={partners.label} blurb={partners.blurb} count={2} />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <StaggerItem>
              <article id="principal" className="group scroll-mt-28 h-full flex flex-col">
                <Link href="/about" className="relative block aspect-[4/5] overflow-hidden bg-ink">
                  <Image
                    src={principal.image}
                    alt={`Portrait of ${principal.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 35vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 text-[10.5px] font-medium tracking-[0.12em] uppercase bg-gold text-ink px-2.5 py-1.5">
                    {principal.role}
                  </span>
                  <span className="absolute right-3 bottom-3 text-[12.5px] font-medium bg-ink/80 text-cream px-3 py-2 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    Full profile →
                  </span>
                </Link>
                <div className="pt-4">
                  <h3 className="m-0 font-display font-medium text-[clamp(20px,2vw,26px)] leading-[1.15] tracking-[-0.02em]">
                    {principal.name}
                  </h3>
                  <p className="m-0 mt-1.5 text-[14px] text-ink/55">{principal.designation}</p>
                </div>
              </article>
            </StaggerItem>
            <StaggerItem>
              <MemberCard member={partner} anchor={anchorOf(partner.name)} sizes="(max-width: 640px) 100vw, 35vw" />
            </StaggerItem>
          </Stagger>
        </section>

        {rest.map((g) => {
          const members = associates.filter((a) => a.group === g.id);
          return (
            <section key={g.id} className="border-t border-ink/12">
              <div className={`${wrap} py-[clamp(56px,7vw,96px)] grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-x-[clamp(32px,5vw,80px)] gap-y-10`}>
                <GroupHead label={g.label} blurb={g.blurb} count={members.length} />
                <Stagger className="grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-5">
                  {members.map((m) => (
                    <StaggerItem key={m.name}>
                      <MemberCard member={m} anchor={anchorOf(m.name)} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-paper-2 text-ink border-t border-ink/10">
        <Reveal className={`${wrap} py-[clamp(56px,8vw,96px)] grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center`}>
          <p className="m-0 font-display font-medium text-[clamp(24px,3vw,38px)] leading-[1.15] tracking-[-0.03em] max-w-[820px]">
            Have a matter before the courts of Pakistan? Send a short summary and the chambers will respond.
          </p>
          <ArrowLink href="/contact" variant="dark">
            Start an enquiry
          </ArrowLink>
        </Reveal>
      </section>
    </div>
  );
}

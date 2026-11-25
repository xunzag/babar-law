import Image from "next/image";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import ArrowLink from "@/components/ArrowLink";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

// Main immigration destinations, shown on the homepage and the immigration
// practice page. Routes are described generally: no outcome is promised.
export const destinations = [
  {
    key: "usa",
    country: "United States",
    image: "/assets/destinations/usa.jpg",
    alt: "The Lower Manhattan skyline at sunset",
    routes: ["Student visas", "Work and business visas", "Family-based immigration"],
    note: "With associated counsel in New York",
  },
  {
    key: "canada",
    country: "Canada",
    image: "/assets/destinations/canada.jpg",
    alt: "A lake in the Canadian Rockies at sunrise",
    routes: ["Study permits", "Work permits", "Family sponsorship and permanent residence"],
    note: "With counsel in Mississauga, Ontario",
  },
  {
    key: "uk",
    country: "United Kingdom",
    image: "/assets/destinations/uk.jpg",
    alt: "The Houses of Parliament and Westminster Bridge at dusk",
    routes: ["Student visas", "Skilled Worker visas", "Family visas, refusals and reviews"],
    note: "Study routes a particular strength",
  },
  {
    key: "europe",
    country: "Europe",
    image: "/assets/destinations/europe.jpg",
    alt: "A European old town square at sunrise",
    routes: ["Schengen and national visas", "Study in the EU", "Golden Visa: Greece, Cyprus, Portugal"],
    note: "With partners in Athens, Cyprus and Portugal",
  },
] as const;

const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";

export default function Destinations({ tone = "dark", linkToPractice = true }: { tone?: "dark" | "light"; linkToPractice?: boolean }) {
  const dark = tone === "dark";
  return (
    <section className={dark ? "bg-ink" : "bg-paper text-ink"}>
      <div className={`${wrap} py-[clamp(72px,10vw,130px)]`}>
        <SectionHead
          tone={tone}
          label="Destinations"
          title="Where we help you go."
          aside={
            linkToPractice ? (
              <ArrowLink href="/practice-areas/immigration-visas" variant={dark ? "outline" : "outlineDark"}>
                Immigration &amp; visas
              </ArrowLink>
            ) : (
              <ArrowLink href="/contact" variant={dark ? "solid" : "dark"}>
                Discuss your move
              </ArrowLink>
            )
          }
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" stagger={0.08}>
          {destinations.map((d) => (
            <StaggerItem key={d.key}>
              <Link
                href="/contact"
                className="group relative block aspect-[4/5] overflow-hidden bg-ink-3 text-cream"
                aria-label={`${d.country}: discuss your move`}
              >
                <Image
                  src={d.image}
                  alt={d.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,13,0.15)_0%,rgba(7,9,13,0)_30%,rgba(7,9,13,0.55)_60%,rgba(7,9,13,0.92)_100%)]" />
                <span className="absolute inset-x-0 bottom-0 p-[clamp(20px,2.4vw,28px)]">
                  <span className="block font-display font-medium text-white text-[clamp(26px,2.4vw,32px)] leading-[1.05] tracking-[-0.03em] mb-4">
                    {d.country}
                  </span>
                  <span className="grid gap-1.5 mb-5">
                    {d.routes.map((r) => (
                      <span key={r} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-cream/85">
                        <span className="mt-[0.55em] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {r}
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center justify-between gap-4 pt-4 border-t border-cream/15">
                    <span className="text-[12.5px] text-gold-light">{d.note}</span>
                    <span className="shrink-0 w-9 h-9 border border-cream/35 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-ink group-hover:-rotate-45">
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

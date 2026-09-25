import Image from "next/image";
import Link from "next/link";
import { callLines, firm, nav, offices } from "@/lib/content";
import ArrowLink from "@/components/ArrowLink";
import LocalClock from "@/components/LocalClock";
import Reveal from "@/components/Reveal";

export default function Footer() {
  return (
    <footer className="relative bg-ink-6 text-cream/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      {/* Closing call to action */}
      <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(80px,12vw,150px)] pb-[clamp(56px,8vw,96px)] border-b border-cream/8">
        <Reveal className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
          <div>
            <div className="eyebrow mb-6">Consultations · Karachi · New York · Remote</div>
            <h2 className="font-display font-medium text-white text-[clamp(44px,8.4vw,120px)] leading-[0.92] tracking-[-0.045em]">
              Speak with
              <br />
              <span className="text-gold">counsel</span> directly.
            </h2>
          </div>
          <div className="grid gap-8 lg:justify-self-end w-full max-w-[420px]">
            <p className="m-0 text-cream/60 text-[17px] leading-relaxed">
              Every enquiry is read by Mr. Babar personally. Expect an initial assessment, usually within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <ArrowLink href="/contact">Book a consultation</ArrowLink>
              <ArrowLink href={firm.whatsapp} external variant="outline">
                WhatsApp
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-16 grid grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-x-8 gap-y-12">
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/assets/babar-law-logo.png"
            alt="Babar Law Associates & Law Office of Manuel B. Quintal, P.C., New York"
            width={220}
            height={230}
            className="w-32 block mb-6 opacity-90"
          />
          <LocalClock
            className="grid gap-2.5 max-w-[240px]"
            cities={[
              { city: "Karachi", tz: "Asia/Karachi" },
              { city: "New York", tz: "America/New_York" },
            ]}
          />
        </div>
        <div>
          <div className="eyebrow mb-5 text-cream/40!">Firm</div>
          <div className="grid gap-2.5">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[14.5px] text-cream/65 hover:text-white w-fit">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow mb-5 text-cream/40!">Call</div>
          <div className="grid gap-4">
            {callLines.map((c) => (
              <a key={c.href} href={c.href} className="group grid gap-0.5 w-fit">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-cream/35">{c.label}</span>
                <span className="text-[14.5px] text-cream/75 group-hover:text-white">{c.number}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="eyebrow mb-5 text-cream/40!">Offices</div>
          <div className="grid gap-6">
            {offices.map((o) => (
              <div key={o.city}>
                <div className="text-white text-[14.5px] mb-1.5">{o.city}</div>
                <p className="m-0 text-[13.5px] leading-relaxed text-cream/50">{o.address}</p>
              </div>
            ))}
            <a href={`mailto:${firm.email}`} className="text-[14px] break-all">
              {firm.email}
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] select-none" aria-hidden>
        <div className="font-display font-semibold text-[clamp(64px,17.5vw,260px)] leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(195_160_102/0.28)] whitespace-nowrap translate-y-[18%]">
          BABAR LAW
        </div>
      </div>

      <div className="relative border-t border-cream/8 bg-ink-6">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-6 flex justify-between gap-4 flex-wrap font-mono text-[11px] tracking-[0.08em] text-cream/35">
          <span>© {new Date().getFullYear()} Babar Law Associates</span>
          <span>Ghulam Shabbir Babar · Attorney at Law · LLM (Europe)</span>
        </div>
      </div>
    </footer>
  );
}

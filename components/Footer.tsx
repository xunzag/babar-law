import Image from "next/image";
import Link from "next/link";
import { firm, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink-6 text-cream/55 border-t border-gold/22">
      <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-16.5 pb-8.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[clamp(28px,4.4vw,52px)]">
        <div>
          <Image
            src="/assets/babar-law-logo.png"
            alt="Babar Law Associates & Law Office of Manuel B. Quintal, P.C., New York"
            width={220}
            height={230}
            className="w-45 max-w-full block mb-5.5"
          />
          <p className="m-0 text-sm leading-relaxed font-light max-w-85">
            Suite No. 305, 3rd Floor, Al-Ayesha Chambers, Passport Office, Saddar, Karachi, Sindh, Pakistan
          </p>
        </div>
        <div>
          <div className="text-gold text-[11px] tracking-[0.28em] uppercase mb-4.5">Pages</div>
          <div className="grid gap-2.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-light text-cream/55 transition-colors hover:text-gold-light"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-gold text-[11px] tracking-[0.28em] uppercase mb-4.5">Contact</div>
          <div className="grid gap-2.5 text-sm font-light">
            <span>USA +1 (914) 557 7765</span>
            <span>USA/Canada 001 202807 7206</span>
            <span>0092 300 2723976</span>
            <span>0092 312-6850058</span>
            <a href={`mailto:${firm.email}`}>{firm.email}</a>
          </div>
        </div>
      </div>
      <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-6 pb-11 border-t border-cream/8 flex justify-between gap-6 flex-wrap text-[13px] text-cream/42">
        <span>© {new Date().getFullYear()} Babar Law Associates. All rights reserved.</span>
        <span>Ghulam Shabbir Babar · Attorney at Law · LLM (Europe)</span>
      </div>
    </footer>
  );
}

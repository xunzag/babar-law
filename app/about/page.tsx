import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ImageGrid from "@/components/ImageGrid";
import CredentialGrid from "@/components/CredentialGrid";
import { academic, gallery, certificates, education, memberships, credentialGroups } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ghulam Shabbir Babar, Attorney at Law, LLM (Europe), immigration lawyer, academic supervisor, Member Expert (Law).",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="Ghulam Shabbir Babar"
        description="Attorney at Law · LLM (Europe) · Immigration lawyer, academic supervisor, Member Expert (Law)"
      />

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,9vw,86px)]">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(34px,5.6vw,70px)] items-start">
          <div className="relative">
            <div className="absolute inset-[18px_-18px_-18px_18px] border border-gold/45" />
            <div className="relative w-full aspect-[4/5]">
              <Image
                src="/assets/home-and-about-page.png"
                alt="Ghulam Shabbir Babar at his desk, Babar Law Associates, Karachi"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-cream text-[18.5px] leading-[1.85] font-light mb-5.5">
              Babar Ghulam Shabbir is sole Partner of Babar Law Associates,
              professional lawyer, academician, International consultant
              (immigration, corporate and commercial), engaged in litigation
              practices (criminal, civil, Constitutional petitions, service
              matters, mediation and ADR) since 2004.
            </p>
            <p className="text-cream/68 text-base leading-[1.85] font-light mb-5.5">
              Academically, he did his Masters in Economics from University
              of Sindh, Jamshoro, Pakistan (Gold Medalist) 1996–2000,
              graduated Law from Hamdard School of Law, Hamdard University,
              Karachi, Pakistan (2003). Won Erasmus Mundus scholarship to
              undertake his degree of LLM in Law and Economics at the
              University of Bologna, Italy &amp; University of Gent, Belgium.
            </p>
            <p className="text-cream/68 text-base leading-[1.85] font-light mb-8.5">
              Babar Law Associates got cooperation with Karma Developers
              (Cyprus) and became Associated Partner of the Erasmus+
              programme called European Masters in Law and Economics (EMLE).
              Recently, Babar has joined as Foreign Attorney in the office of
              Manuel B. Quintal at New York Manhattan USA and also Canadian
              Society of Law as Barrister and Solicitor. He has also joined
              the UBL legal panel.
            </p>
            <div className="border-t border-gold/25 pt-8">
              <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-5.5">
                Academic appointments
              </div>
              <div>
                {academic.map((t) => (
                  <div
                    key={t}
                    className="grid grid-cols-[24px_minmax(0,1fr)] gap-3.5 py-3.25 border-b border-cream/8"
                  >
                    <span className="text-gold text-[15px]">•</span>
                    <span className="text-cream/82 text-base leading-relaxed font-light">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-2.5 pb-22.5">
        <Reveal>
          <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-7.5">
            In practice
          </div>
          <ImageGrid items={gallery} variant="gallery" />
        </Reveal>
      </section>

      <section className="bg-ink-3 border-t border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,9vw,88px)]">
          <Reveal>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4">
              Certificates
            </div>
            <h2 className="font-serif font-medium text-[clamp(28px,4.8vw,44px)] mb-11 text-white">
              Speaking &amp; appreciation
            </h2>
            <ImageGrid items={certificates} variant="certificates" />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-2 border-t border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,9vw,88px)]">
          <Reveal>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4">Credentials</div>
            <h2 className="font-serif font-medium text-[clamp(28px,4.8vw,44px)] mb-12 text-white">Licence, degrees and letters of cooperation</h2>
            {credentialGroups.map((g) => (
              <div key={g.heading} className="mb-14 last:mb-0">
                <div className="text-cream/45 text-[11px] tracking-[0.28em] uppercase mb-6">{g.heading}</div>
                <CredentialGrid items={g.items} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-3 border-t border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(54px,9vw,92px)]">
          <Reveal>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4">
              Education
            </div>
            <h2 className="font-serif font-medium text-[clamp(28px,5vw,46px)] mb-12 text-white">
              Qualifications
            </h2>
            <div className="grid gap-px bg-gold/16 border border-gold/16">
              {education.map((e) => (
                <div
                  key={e.school}
                  className="bg-ink-2 py-9.5 px-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-8.5 items-start"
                >
                  <div>
                    <div className="font-serif text-[23px] leading-snug mb-2 text-white">
                      {e.school}
                    </div>
                    <div className="text-cream/50 text-sm">{e.degree}</div>
                    <div className="text-gold text-[13.5px] tracking-wide mt-2.5">
                      {e.years}
                    </div>
                  </div>
                  <div className="text-cream/70 text-base leading-[1.75] font-light">
                    {e.note}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(54px,9vw,90px)]">
        <Reveal>
          <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-8.5">
            Memberships &amp; distinctions
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-7.5">
            {memberships.map((m) => (
              <div
                key={m}
                className="border-t border-gold/45 pt-5 text-cream/80 text-base leading-relaxed font-light"
              >
                {m}
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}

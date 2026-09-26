import Reveal from "@/components/Reveal";
import AboutHero from "@/components/heroes/AboutHero";
import SectionHead from "@/components/SectionHead";
import ImageGrid from "@/components/ImageGrid";
import CredentialGrid from "@/components/CredentialGrid";
import ParallaxImage from "@/components/motion/ParallaxImage";
import ScrollText from "@/components/motion/ScrollText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { academic, gallery, certificates, education, memberships, credentialGroups } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ghulam Shabbir Babar, Attorney at Law, LLM (Europe), immigration lawyer, academic supervisor, Member Expert (Law).",
  alternates: { canonical: "/about" },
};

const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />

      {/* Biography */}
      <section className="bg-paper text-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <ScrollText
            text="Babar Ghulam Shabbir is Partner of Babar Law Associates: professional lawyer, academician and international consultant in immigration, corporate and commercial matters, engaged in litigation since 2004."
            className="font-display font-medium text-[clamp(26px,3.8vw,54px)] leading-[1.1] tracking-[-0.035em] max-w-[1180px] m-0 mb-[clamp(56px,8vw,110px)]"
          />
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-[clamp(40px,6vw,96px)] items-start">
            <div className="lg:sticky lg:top-28">
              <ParallaxImage
                src="/assets/home-and-about-page.png"
                alt="Ghulam Shabbir Babar at his desk, Babar Law Associates, Karachi"
                className="aspect-[4/5] w-full"
              />
            </div>
            <Reveal>
              <p className="text-ink/80 text-[17px] leading-[1.85] mb-6">
                His litigation practice covers criminal, civil and constitutional petitions, service matters,
                mediation and ADR. Academically, he took his Masters in Economics from the University of Sindh,
                Jamshoro (Gold Medalist, 1996–2000), graduated in Law from Hamdard School of Law, Hamdard University,
                Karachi (2003), and won an Erasmus Mundus scholarship for the LLM in Law and Economics at the
                University of Bologna, Italy and Ghent University, Belgium.
              </p>
              <p className="text-ink/65 text-[16.5px] leading-[1.85] mb-12">
                Babar Law Associates entered into cooperation with Karma Developers (Cyprus) and became Associated
                Partner of the Erasmus+ European Masters in Law and Economics (EMLE). He has joined the office of
                Manuel B. Quintal in Manhattan, New York as Foreign Attorney, the Canadian Society of Law as
                Barrister and Solicitor, and the UBL legal panel.
              </p>
              <div className="eyebrow text-gold-deep! mb-5">Academic appointments</div>
              <Stagger className="border-t border-ink/12">
                {academic.map((t) => (
                  <StaggerItem
                    key={t}
                    className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 py-4.5 border-b border-ink/12"
                  >
                    <span className="mt-3 w-4 h-px bg-gold-deep" />
                    <span className="text-ink/85 text-[16px] leading-relaxed">{t}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead label="Education" title="Qualifications." />
          <Stagger className="border-t border-cream/10">
            {education.map((e) => (
              <StaggerItem
                key={e.school}
                className="group grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-10 gap-y-3 py-9 border-b border-cream/10"
              >
                <div className="font-medium text-[12px] text-gold pt-1.5">{e.years}</div>
                <div>
                  <h3 className="m-0 font-display font-medium text-[clamp(22px,2.4vw,30px)] leading-[1.1] text-white mb-2 group-hover:text-gold-light transition-colors">
                    {e.school}
                  </h3>
                  <div className="text-cream/50 text-[14.5px]">{e.degree}</div>
                </div>
                <p className="m-0 text-cream/65 text-[15.5px] leading-[1.75]">{e.note}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Memberships */}
      <section className="bg-ink-2 border-y border-cream/8">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead label="Memberships & distinctions" title="Institutions and associations." />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 border border-cream/10">
            {memberships.map((m) => (
              <StaggerItem key={m} className="bg-ink-2 p-7 min-h-[150px] flex flex-col gap-6 hover:bg-ink-4 transition-colors">
                <span className="w-6 h-px bg-gold" />
                <p className="m-0 text-cream/80 text-[15.5px] leading-relaxed">{m}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead label="Credentials" title="Licence, degrees and letters of cooperation." />
          {credentialGroups.map((g) => (
            <Reveal key={g.heading} className="mb-16 last:mb-0">
              <div className="font-medium text-cream/55 text-[10.5px] tracking-[0.2em] uppercase mb-6">{g.heading}</div>
              <CredentialGrid items={g.items} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* In practice + certificates */}
      <section className="bg-ink-3 border-t border-cream/8">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead label="In practice" title="At the podium and abroad." />
          <Reveal>
            <ImageGrid items={gallery} variant="gallery" />
          </Reveal>
          <div className="mt-[clamp(64px,9vw,120px)]">
            <SectionHead label="Certificates" title="Speaking & appreciation." />
            <Reveal>
              <ImageGrid items={certificates} variant="certificates" />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

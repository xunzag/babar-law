import Reveal from "@/components/Reveal";
import ContactHero from "@/components/heroes/ContactHero";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { callLines, offices, firm } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation",
  description: "Send a detailed enquiry, or speak with Mr. Babar directly on WhatsApp, by email, or by telephone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <ContactHero />

      {/* Primary: the enquiry form */}
      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(50px,8vw,84px)]">
        <Reveal className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-[clamp(36px,6vw,72px)] items-start">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow mb-4">
              Detailed enquiry
            </div>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,38px)] mb-5 text-white leading-[1.2]">
              Send a query
            </h2>
            <p className="text-cream/60 text-base leading-relaxed font-light mb-9">
              Tell us what your matter is about, and the form adjusts to ask
              for the details most relevant to that area of practice.
            </p>
            <div className="grid gap-5">
              {[
                ["Confidential", "Reviewed personally by Mr. Babar, never outsourced."],
                ["No obligation", "An initial assessment before any engagement begins."],
                ["Fast response", "Replies within one business day, worldwide."],
              ].map(([title, body]) => (
                <div key={title} className="border-l border-gold/40 pl-5">
                  <div className="text-white text-[15px] mb-1">{title}</div>
                  <div className="text-cream/50 text-sm font-light leading-relaxed">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative border border-gold/25 bg-ink-3 p-[clamp(22px,4vw,44px)]">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(90deg,#8c6d3c,#e0c894,#8c6d3c)]" />
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* Secondary: direct lines */}
      <section className="bg-ink-2 border-y border-gold/18">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(50px,8vw,80px)]">
          <Reveal className="mb-9">
            <div className="eyebrow mb-3">
              Or reach him directly
            </div>
            <h2 className="font-display font-medium text-[clamp(24px,3.2vw,32px)] text-white">
              No forms, no intermediaries
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <a
              href={firm.whatsapp}
              target="_blank"
              rel="noopener"
              className="group lg:col-span-3 relative overflow-hidden bg-[linear-gradient(135deg,#c3a066,#8c6d3c)] text-ink p-[clamp(28px,4vw,44px)] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-6 mb-9">
                <div className="text-[11.5px] tracking-[0.28em] uppercase opacity-70">
                  Fastest reply
                </div>
                <WhatsAppIcon className="w-9 h-9 opacity-80" />
              </div>
              <div className="relative">
                <div className="font-display text-[clamp(26px,3.6vw,36px)] leading-[1.15] mb-3">
                  Message on WhatsApp
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <span>+92 300 2723976</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            </a>

            <a
              href={`mailto:${firm.email}?subject=Consultation%20request%20-%20Babar%20Law%20Associates&body=Please%20describe%20your%20matter%2C%20your%20country%20of%20residence%20and%20the%20outcome%20you%20are%20seeking.`}
              className="group lg:col-span-2 border border-gold/30 bg-ink-4 p-[clamp(28px,4vw,44px)] flex flex-col justify-between transition-colors duration-300 hover:border-gold hover:bg-ink-5"
            >
              <div className="flex items-start justify-between gap-6 mb-9">
                <div className="text-[11.5px] tracking-[0.28em] uppercase text-cream/45">
                  By email
                </div>
                <MailIcon className="w-8 h-8 text-gold" />
              </div>
              <div>
                <div className="font-display text-[clamp(22px,2.8vw,27px)] leading-[1.2] mb-3 text-white">
                  Write with your matter
                </div>
                <div className="flex items-center gap-3 text-[15px] text-gold">
                  <span>{firm.email}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            </a>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mt-5 border border-gold/20 bg-ink-4 divide-y divide-gold/12 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-gold/12"
          >
            {callLines.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="group flex items-center gap-4 px-6.5 py-6 transition-colors duration-300 hover:bg-ink-5"
              >
                <PhoneIcon className="w-5 h-5 text-gold shrink-0" />
                <div className="min-w-0">
                  <div className="text-cream/45 text-[10.5px] tracking-[0.22em] uppercase mb-1.5">
                    {c.label}
                  </div>
                  <div className="text-cream text-[15px] tracking-wide truncate group-hover:text-gold-light transition-colors">
                    {c.number}
                  </div>
                </div>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Offices */}
      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(52px,8vw,84px)]">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 mb-5">
          {offices.map((o) => (
            <div key={o.city} className="bg-ink-4 border border-gold/16 p-8.5">
              <div className="flex items-center gap-3 mb-4">
                <PinIcon className="w-5 h-5 text-gold shrink-0" />
                <div className="font-display text-2xl text-white">{o.city}</div>
              </div>
              <p className="m-0 mb-4 text-cream/65 text-[15.5px] leading-[1.75] font-light">
                {o.address}
              </p>
              <div className="text-gold text-[15px] leading-relaxed">
                {o.phones}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.08} className="border border-gold/25 bg-ink-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.171051832325!2d67.02159857592189!3d24.858006845354776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f1dd395c97b%3A0xad5b1d3218570d01!2sAl-Ayesha%20Chambers!5e0!3m2!1sen!2s!4v1789093079015!5m2!1sen!2s"
            width="600"
            height="360"
            style={{ border: 0 }}
            className="w-full block grayscale-[0.3] contrast-105"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Al-Ayesha Chambers, Saddar, Karachi"
          />
          <div className="py-4.5 px-5 border-t border-gold/20 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-cream/62 text-[14.5px] leading-relaxed font-light">
              Suite No. 305, 3rd Floor, Al-Ayesha Chambers, Passport Office,
              Saddar, Karachi
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Al-Ayesha+Chambers+Saddar+Karachi"
              target="_blank"
              rel="noopener"
              className="text-xs tracking-[0.16em] uppercase whitespace-nowrap"
            >
              Directions →
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

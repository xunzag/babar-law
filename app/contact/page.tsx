import Image from "next/image";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { callLines, offices, firm } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation",
  description: "Speak with Mr. Babar directly on WhatsApp, by email, by telephone, or send a detailed enquiry.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gold/20">
        <Image
          src="/assets/court.png"
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.78),rgba(8,8,10,0.98))]" />
        <div className="relative max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(64px,10vw,104px)] pb-[clamp(56px,9vw,92px)]">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-11.5 h-px bg-gold block" />
            <span className="text-gold text-[11.5px] tracking-[0.36em] uppercase">
              Consultation
            </span>
          </div>
          <h1 className="font-serif font-medium text-[clamp(38px,7vw,68px)] mb-6 leading-[1.05] tracking-[-0.015em] text-white max-w-[720px]">
            Speak with Mr. Babar directly.
          </h1>
          <p className="m-0 text-cream/70 text-[18.5px] font-light max-w-[600px] mb-11">
            No forms, no intermediaries, unless you prefer to write ahead.
            Reach him on WhatsApp, by email, by telephone, or send a detailed
            enquiry below.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              "Consultations in Karachi",
              "By appointment in New York",
              "Remote worldwide",
              "Replies within one business day",
            ].map((line) => (
              <div key={line} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <span className="text-cream/55 text-sm tracking-wide">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct lines */}
      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(50px,8vw,84px)] pb-16">
        <Reveal className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <a
            href={firm.whatsapp}
            target="_blank"
            rel="noopener"
            className="group lg:col-span-3 relative overflow-hidden bg-[linear-gradient(135deg,#c9a227,#a9821c)] text-ink p-[clamp(30px,4.5vw,52px)] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-start justify-between gap-6 mb-10">
              <div className="text-[11.5px] tracking-[0.28em] uppercase opacity-70">
                Fastest reply
              </div>
              <WhatsAppIcon className="w-9 h-9 opacity-80" />
            </div>
            <div className="relative">
              <div className="font-serif text-[clamp(28px,4vw,40px)] leading-[1.15] mb-3">
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
            className="group lg:col-span-2 border border-gold/30 bg-ink-4 p-[clamp(30px,4.5vw,52px)] flex flex-col justify-between transition-colors duration-300 hover:border-gold hover:bg-ink-5"
          >
            <div className="flex items-start justify-between gap-6 mb-10">
              <div className="text-[11.5px] tracking-[0.28em] uppercase text-cream/45">
                By email
              </div>
              <MailIcon className="w-8 h-8 text-gold" />
            </div>
            <div>
              <div className="font-serif text-[clamp(24px,3vw,30px)] leading-[1.2] mb-3 text-white">
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
          className="mt-5 border border-gold/20 bg-ink-2 divide-y divide-gold/12 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-gold/12"
        >
          {callLines.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group flex items-center gap-4 px-6.5 py-6 transition-colors duration-300 hover:bg-ink-4"
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

        <Reveal delay={0.12}>
          <p className="mt-8 mb-0 text-cream/50 text-[15px] leading-relaxed font-light max-w-[720px]">
            Please include your country of residence, the nature of your
            matter and any deadline. Enquiries from the United States, United
            Kingdom and Europe are answered within one business day.
          </p>
        </Reveal>
      </section>

      {/* Offices */}
      <section className="bg-ink-3 border-y border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,8vw,84px)]">
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 mb-5">
            {offices.map((o) => (
              <div key={o.city} className="bg-ink-4 border border-gold/16 p-8.5">
                <div className="flex items-center gap-3 mb-4">
                  <PinIcon className="w-5 h-5 text-gold shrink-0" />
                  <div className="font-serif text-2xl text-white">{o.city}</div>
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
        </div>
      </section>

      {/* Detailed enquiry */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="relative max-w-[880px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(56px,9vw,100px)]">
          <Reveal className="text-center mb-12">
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4">
              Detailed enquiry
            </div>
            <h2 className="font-serif font-medium text-[clamp(30px,5vw,46px)] mb-5 text-white">
              Send a query
            </h2>
            <p className="text-cream/60 text-base leading-relaxed font-light max-w-[540px] mx-auto">
              Tell us what your matter is about, and the form adjusts to ask
              for the details most relevant to that area of practice.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative border border-gold/25 bg-ink-3 p-[clamp(24px,4vw,52px)]">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(90deg,#8a6a12,#e6cd72,#8a6a12)]" />
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

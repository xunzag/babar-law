import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gold/20">
      <Image
        src="/assets/court.png"
        alt=""
        fill
        priority
        className="absolute inset-0 object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/60 to-ink/92" />
      <div className="relative max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(52px,9vw,86px)] pb-[78px]">
        <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4.5">
          {eyebrow}
        </div>
        <h1 className="font-serif font-medium text-[clamp(34px,6.6vw,60px)] mb-4 leading-[1.05] tracking-[-0.015em] text-white">
          {title}
        </h1>
        {description && (
          <p className="m-0 text-cream/70 text-lg font-light max-w-[660px]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

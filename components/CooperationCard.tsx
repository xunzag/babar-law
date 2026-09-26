import Image from "next/image";

type Partner = {
  country: string;
  name: string;
  role: string;
  note: string;
  logo?: string;
  url?: string;
};

const cardClass =
  "group bg-ink-4 border border-gold/16 p-8.5 flex flex-col gap-6 transition-all duration-350 hover:bg-ink-5 hover:-translate-y-1";

function CardBody({ partner }: { partner: Partner }) {
  return (
    <>
      {partner.logo && (
        <div className="h-16 w-full flex items-center">
          <div className="bg-[#f4f1ea] h-16 px-5 flex items-center justify-center">
            <div className="relative h-10 w-36">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="180px"
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="text-cream/55 text-[11px] tracking-[0.24em] uppercase mb-2.5">
          {partner.country}
        </div>
        <h3 className="font-display font-semibold text-[22px] leading-tight text-white mb-1.5">
          {partner.name}
        </h3>
        <div className="text-gold text-[13px] mb-3">{partner.role}</div>
        <p className="m-0 text-cream/60 text-sm leading-relaxed font-light">
          {partner.note}
        </p>
      </div>
      {partner.url && (
        <span className="mt-auto text-gold text-xs tracking-[0.16em] uppercase transition-colors group-hover:text-gold-light">
          Visit website →
        </span>
      )}
    </>
  );
}

export default function CooperationCard({ partner }: { partner: Partner }) {
  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        <CardBody partner={partner} />
      </a>
    );
  }

  return (
    <div className={cardClass}>
      <CardBody partner={partner} />
    </div>
  );
}

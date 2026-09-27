import Image from "next/image";

type Partner = {
  country: string;
  name: string;
  role: string;
  note: string;
  logo?: string;
  url?: string;
};

const initialsOf = (name: string) =>
  name
    .split(/[\s,]+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

// Equal-height partner card: a fixed logo panel, the text, and a footer row
// pinned to the bottom so every card in a row lines up.
function CardBody({ partner }: { partner: Partner }) {
  return (
    <>
      <div className="relative h-[124px] bg-paper flex items-center justify-center overflow-hidden">
        {partner.logo ? (
          <div className="relative h-14 w-44 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]">
            <Image src={partner.logo} alt={partner.name} fill className="object-contain" sizes="180px" />
          </div>
        ) : (
          <span className="font-display font-medium text-[40px] tracking-[-0.04em] text-ink/70">
            {initialsOf(partner.name)}
          </span>
        )}
        <span className="absolute left-4 top-3.5 text-[11px] font-medium tracking-[0.12em] uppercase text-ink/60">
          {partner.country}
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6 sm:p-7">
        <h3 className="m-0 font-display font-medium text-[20px] leading-[1.2] tracking-[-0.02em] text-white mb-2">
          {partner.name}
        </h3>
        <div className="text-gold text-[13px] leading-snug mb-4">{partner.role}</div>
        <p className="m-0 text-cream/65 text-[14.5px] leading-relaxed">{partner.note}</p>
      </div>
      <div className="flex items-center justify-between px-6 sm:px-7 py-4 border-t border-cream/10 text-[13px]">
        {partner.url ? (
          <>
            <span className="text-cream/80 group-hover:text-white transition-colors">Visit website</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </>
        ) : (
          <span className="text-cream/55">Cooperation partner</span>
        )}
      </div>
    </>
  );
}

const cardClass =
  "group h-full flex flex-col bg-ink-4 border border-cream/10 overflow-hidden transition-colors duration-300 hover:border-gold/50";

export default function CooperationCard({ partner }: { partner: Partner }) {
  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className={`${cardClass} text-cream`}>
      <CardBody partner={partner} />
    </a>
  ) : (
    <div className={cardClass}>
      <CardBody partner={partner} />
    </div>
  );
}

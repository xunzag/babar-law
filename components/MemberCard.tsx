import { initials, type Member } from "@/lib/content";

// Profile card for a member of chambers. Monogram stands in for a portrait.
export default function MemberCard({
  member,
  index,
  total,
  anchor,
}: {
  member: Member;
  index: number;
  total: number;
  anchor: string;
}) {
  return (
    <article
      id={anchor}
      className="group relative scroll-mt-28 bg-paper border border-ink/12 aspect-[4/5] p-[clamp(18px,2.2vw,26px)] flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-ink"
    >
      <span className="absolute inset-0 bg-ink origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10.5px] text-ink/40 group-hover:text-cream/40 transition-colors">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {member.role && (
          <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase bg-gold/20 text-gold-deep group-hover:bg-gold group-hover:text-ink px-2 py-1 transition-colors">
            {member.role}
          </span>
        )}
      </div>
      <div
        aria-hidden
        className="relative font-display font-semibold text-[clamp(64px,8vw,112px)] leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.2px_rgb(10_13_19/0.22)] group-hover:[-webkit-text-stroke:1.2px_#c3a066] transition-all duration-500 group-hover:-translate-y-1"
      >
        {initials(member.name)}
      </div>
      <div className="relative">
        <h3 className="m-0 font-display font-medium text-[clamp(19px,1.8vw,23px)] leading-[1.15] tracking-[-0.02em] text-ink group-hover:text-white transition-colors duration-300">
          {member.name}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[13.5px] text-ink/60 group-hover:text-cream/60 transition-colors duration-300">
          <span className="w-4 h-px bg-gold-deep group-hover:bg-gold" />
          {member.designation}
        </div>
      </div>
    </article>
  );
}

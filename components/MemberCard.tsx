import Image from "next/image";
import { initials, type Member } from "@/lib/content";

// Profile card for a member of chambers: a portrait when we have one,
// otherwise a monogram in the same frame so the grid stays even.
export default function MemberCard({
  member,
  anchor,
  sizes = "(max-width: 1280px) 50vw, 22vw",
}: {
  member: Member;
  anchor: string;
  sizes?: string;
}) {
  return (
    <article id={anchor} className="group scroll-mt-28 h-full flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 border border-ink/10">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.designation}`}
            fill
            sizes={sizes}
            className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-2">
            <span
              aria-hidden
              className="font-display font-medium text-[clamp(56px,7vw,96px)] tracking-[-0.05em] text-ink/15 transition-colors duration-500 group-hover:text-gold-deep/50"
            >
              {initials(member.name)}
            </span>
          </div>
        )}
        {member.role && (
          <span className="absolute left-3 top-3 text-[10.5px] font-medium tracking-[0.12em] uppercase bg-paper/95 text-ink px-2.5 py-1.5">
            {member.role}
          </span>
        )}
      </div>
      <div className="pt-4">
        <h3 className="m-0 font-display font-medium text-[clamp(18px,1.7vw,22px)] leading-[1.15] tracking-[-0.02em] text-ink">
          {member.name}
        </h3>
        <p className="m-0 mt-1.5 text-[14px] text-ink/55">{member.designation}</p>
      </div>
    </article>
  );
}

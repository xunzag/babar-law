"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { associates, initials, principal, teamGroups } from "@/lib/content";

type Row = { name: string; designation: string; role?: string; href: string };

// Editorial roster of the chambers. On pointer devices a brass monogram
// follows the cursor over whichever name is hovered.
export default function ChambersRoster() {
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.6 });

  const groups = teamGroups.map((g) => {
    const members: Row[] = associates
      .filter((a) => a.group === g.id)
      .map((a) => ({ ...a, href: `/associates#member-${associates.indexOf(a) + 1}` }));
    if (g.id === "partners") members.unshift({ ...principal, href: "/associates#principal" });
    return { ...g, members };
  });
  // Running number across groups, for the 01–12 index down the left.
  const offsets = groups.map((_, i) => groups.slice(0, i).reduce((t, g) => t + g.members.length, 0));

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        // Appear under the cursor rather than flying in from the corner.
        if (!active) {
          sx.jump(e.clientX - r.left);
          sy.jump(e.clientY - r.top);
        }
      }}
      onPointerLeave={() => setActive(null)}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            key="cursor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{ left: sx, top: sy, x: "-50%", y: "-50%" }}
            className="pointer-events-none absolute z-20 w-28 h-28 rounded-full bg-gold text-ink hidden [@media(hover:hover)]:flex items-center justify-center shadow-[0_20px_50px_rgba(140,109,60,0.35)]"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-display font-semibold text-[34px] tracking-[-0.05em]"
              >
                {initials(active)}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {groups.map((g, gi) => (
        <div key={g.id} className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-x-10 border-t border-ink/15">
          <div className="pt-6 pb-3 md:pb-6 flex md:flex-col justify-between md:justify-start gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/50">{g.label}</span>
            <span className="font-mono text-[10.5px] text-gold-deep">{String(g.members.length).padStart(2, "0")}</span>
          </div>
          <ul className="m-0 p-0 list-none">
            {g.members.map((m, mi) => {
              const n = offsets[gi] + mi + 1;
              return (
                <motion.li
                  key={m.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-ink/10 last:border-b-0 md:[&:first-child]:border-t-0"
                >
                  <Link
                    href={m.href}
                    onPointerEnter={() => setActive(m.name)}
                    className={`group grid grid-cols-[32px_minmax(0,1fr)_auto] sm:grid-cols-[40px_minmax(0,1fr)_minmax(0,220px)_24px] items-center gap-x-4 py-4.5 text-ink transition-opacity duration-300 ${
                      active && active !== m.name ? "[@media(hover:hover)]:opacity-35" : ""
                    }`}
                  >
                    <span className="font-mono text-[10.5px] text-ink/35">{String(n).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block font-display font-medium text-[clamp(22px,2.9vw,38px)] leading-[1.1] tracking-[-0.035em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                        {m.name}
                      </span>
                      <span className="sm:hidden block text-[12.5px] text-ink/55 mt-1">
                        {m.designation}
                        {m.role ? ` · ${m.role}` : ""}
                      </span>
                    </span>
                    <span className="hidden sm:flex flex-col items-end text-right gap-1">
                      <span className="text-[14px] text-ink/65">{m.designation}</span>
                      {m.role && (
                        <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-gold-deep">{m.role}</span>
                      )}
                    </span>
                    <span className="text-gold-deep text-lg justify-self-end opacity-40 transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:-rotate-45">
                      →
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

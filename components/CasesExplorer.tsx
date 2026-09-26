"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cases, caseYear, fmtMonth } from "@/lib/cases";
import Dropdown from "@/components/Dropdown";

const groups = ["All", "Constitutional", "Bail", "Criminal appeals", "Civil & commercial"];
const PAGE = 25;

const sorted = [...cases].sort((a, b) => (b.filed || `${b.year}-00`).localeCompare(a.filed || `${a.year}-00`));

const toOptions = (values: string[]) => values.map((v) => ({ id: v, label: v }));

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-gold text-[10px] tracking-[0.22em] uppercase mb-2">{label}</div>
      {children}
    </div>
  );
}

export default function CasesExplorer() {
  const [group, setGroup] = useState("All");
  const [status, setStatus] = useState("All statuses");
  const [subject, setSubject] = useState("All subjects");
  const [role, setRole] = useState("All roles");
  const [judgOnly, setJudgOnly] = useState(false);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const subjects = useMemo(() => ["All subjects", ...Array.from(new Set(cases.map((c) => c.subject))).sort()], []);
  const roles = useMemo(() => ["All roles", ...Array.from(new Set(cases.map((c) => c.role).filter(Boolean))).sort()], []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sorted.filter(
      (c) =>
        (group === "All" || c.group === group) &&
        (status === "All statuses" || c.status === status) &&
        (subject === "All subjects" || c.subject === subject) &&
        (role === "All roles" || c.role === role) &&
        (!judgOnly || c.judgment) &&
        (!needle || c.id.toLowerCase().includes(needle) || c.title.toLowerCase().includes(needle))
    );
  }, [group, status, subject, role, judgOnly, q]);

  const reset = () => setShown(PAGE);

  const filtersActive =
    status !== "All statuses" || subject !== "All subjects" || role !== "All roles" || judgOnly || q.trim() !== "";

  const clearFilters = () => {
    setStatus("All statuses");
    setSubject("All subjects");
    setRole("All roles");
    setJudgOnly(false);
    setQ("");
    reset();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-7">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => { setGroup(g); reset(); }}
            className={`px-4.5 py-2.5 text-[12px] tracking-[0.14em] uppercase border cursor-pointer transition-colors duration-300 ${
              group === g ? "bg-gold text-ink border-gold" : "border-gold/30 text-cream/70 hover:border-gold hover:text-gold-light"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="border border-gold/16 bg-ink-3 p-5 sm:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_repeat(3,1fr)] gap-4">
          <Field label="Search">
            <div className="relative">
              <svg
                aria-hidden
                viewBox="0 0 18 18"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 fill-none stroke-gold/55"
                strokeWidth={1.4}
              >
                <circle cx="7.5" cy="7.5" r="5.5" />
                <path d="M15.5 15.5l-3.8-3.8" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); reset(); }}
                placeholder="Case number or party name"
                className="w-full bg-ink-4 border border-gold/25 text-cream text-[15px] py-3.5 pl-10 pr-4.5 outline-none placeholder:text-cream/30 transition-colors duration-200 hover:border-gold/45 focus:border-gold"
              />
            </div>
          </Field>
          <Field label="Status">
            <Dropdown
              label="Status"
              value={status}
              onChange={(v) => { setStatus(v); reset(); }}
              options={toOptions(["All statuses", "Disposed", "Pending"])}
            />
          </Field>
          <Field label="Subject">
            <Dropdown label="Subject" value={subject} onChange={(v) => { setSubject(v); reset(); }} options={toOptions(subjects)} />
          </Field>
          <Field label="Role">
            <Dropdown label="Role" value={role} onChange={(v) => { setRole(v); reset(); }} options={toOptions(roles)} />
          </Field>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-5 border-t border-cream/8">
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <span
              className={`relative flex items-center justify-center w-[18px] h-[18px] border transition-colors duration-200 ${
                judgOnly ? "bg-gold border-gold" : "border-gold/35 group-hover:border-gold/60"
              }`}
            >
              <input
                type="checkbox"
                checked={judgOnly}
                onChange={(e) => { setJudgOnly(e.target.checked); reset(); }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {judgOnly && (
                <svg viewBox="0 0 12 10" className="w-2.5 h-2.5 fill-none stroke-ink" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 5l3.2 3.2L11 1.5" />
                </svg>
              )}
            </span>
            <span className="text-cream/70 text-[13px] tracking-wide">Judgment on record only</span>
          </label>

          {filtersActive && (
            <button
              onClick={clearFilters}
              className="text-gold/80 text-[11.5px] tracking-[0.14em] uppercase cursor-pointer transition-colors hover:text-gold-light"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="font-medium text-cream/60 text-[11px] tracking-[0.16em] uppercase mb-4 tabular-nums">
        <motion.span key={list.length} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-gold-light">
          {list.length}
        </motion.span>{" "}
        matter{list.length === 1 ? "" : "s"}
      </div>

      <div className="border border-gold/20 bg-ink-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left border-collapse">
          <thead>
            <tr className="text-gold text-[10.5px] tracking-[0.22em] uppercase border-b border-gold/25">
              <th className="px-5 py-4 font-normal">Case no.</th>
              <th className="px-5 py-4 font-normal">Parties</th>
              <th className="px-5 py-4 font-normal">Subject</th>
              <th className="px-5 py-4 font-normal">Role</th>
              <th className="px-5 py-4 font-normal">Filed</th>
              <th className="px-5 py-4 font-normal">Outcome</th>
            </tr>
          </thead>
          <tbody key={[group, status, subject, role, judgOnly, q].join("|")}>
            {list.slice(0, shown).map((c, i) => (
              <motion.tr
                key={c.id + i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % (PAGE * 2)) * 0.022, ease: [0.16, 1, 0.3, 1] }}
                className="group border-b border-cream/8 hover:bg-ink-5 transition-colors align-top"
              >
                <td className="relative px-5 py-4 font-medium text-gold-light text-[13.5px] whitespace-nowrap">
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  {c.short} {c.bench}-{c.number}/{c.year}
                  <div className="font-sans text-cream/55 text-[11.5px] mt-1.5 tracking-normal">{c.seat} · {c.typeLabel}</div>
                </td>
                <td className="px-5 py-4 text-cream/75 text-[14px] leading-snug max-w-[340px]">{c.title}</td>
                <td className="px-5 py-4 text-cream/65 text-[13.5px]">{c.subject}</td>
                <td className="px-5 py-4 text-cream/65 text-[13.5px]">{c.role}</td>
                <td className="px-5 py-4 text-cream/65 text-[13.5px] whitespace-nowrap">{c.filed ? fmtMonth(c.filed) : caseYear(c)}</td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={`text-[11px] tracking-[0.16em] uppercase px-2.5 py-1 border ${c.status === "Pending" ? "border-gold text-gold" : "border-cream/20 text-cream/60"}`}>
                    {c.status}
                  </span>
                  {c.judgment && <span className="ml-2 text-gold-light text-[11px] tracking-wide">Judgment</span>}
                  {c.disposed && <div className="text-cream/55 text-[11.5px] mt-1.5">{fmtMonth(c.disposed)}</div>}
                </td>
              </motion.tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-cream/50">No matters match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {shown < list.length && (
        <div className="mt-7 flex justify-center">
          <button
            onClick={() => setShown((s) => s + PAGE * 2)}
            className="border border-gold text-gold px-9 py-3.5 text-[12.5px] tracking-[0.16em] uppercase cursor-pointer transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Show more ({list.length - shown} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

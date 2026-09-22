"use client";

import { useMemo, useState } from "react";
import { cases, caseYear, fmtMonth } from "@/lib/cases";

const groups = ["All", "Constitutional", "Bail", "Criminal appeals", "Civil & commercial"];
const PAGE = 25;

const sorted = [...cases].sort((a, b) => (b.filed || `${b.year}-00`).localeCompare(a.filed || `${a.year}-00`));

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-ink-4 border border-gold/25 text-cream/85 text-[13px] py-3 px-3.5 outline-none cursor-pointer focus:border-gold"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-ink-4">
          {o}
        </option>
      ))}
    </select>
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

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-5">
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

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)_auto] gap-3 mb-3">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); reset(); }}
          placeholder="Search case number or party"
          className="bg-ink-4 border border-gold/25 text-cream text-[14px] py-3 px-4 outline-none placeholder:text-cream/30 focus:border-gold"
        />
        <Select label="Status" value={status} onChange={(v) => { setStatus(v); reset(); }} options={["All statuses", "Disposed", "Pending"]} />
        <Select label="Subject" value={subject} onChange={(v) => { setSubject(v); reset(); }} options={subjects} />
        <Select label="Role" value={role} onChange={(v) => { setRole(v); reset(); }} options={roles} />
        <label className="flex items-center gap-2.5 text-cream/70 text-[13px] cursor-pointer select-none px-2">
          <input type="checkbox" checked={judgOnly} onChange={(e) => { setJudgOnly(e.target.checked); reset(); }} className="accent-[#c9a227] w-4 h-4" />
          Judgment on record
        </label>
      </div>

      <div className="text-cream/45 text-[13px] mb-4 tracking-wide">
        {list.length} matter{list.length === 1 ? "" : "s"}
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
          <tbody>
            {list.slice(0, shown).map((c, i) => (
              <tr key={c.id + i} className="border-b border-cream/8 hover:bg-ink-5 transition-colors align-top">
                <td className="px-5 py-4 text-cream text-[14px] whitespace-nowrap">
                  {c.short} {c.bench}-{c.number}/{c.year}
                  <div className="text-cream/40 text-[11.5px] mt-1">{c.seat} · {c.typeLabel}</div>
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
                  {c.disposed && <div className="text-cream/40 text-[11.5px] mt-1.5">{fmtMonth(c.disposed)}</div>}
                </td>
              </tr>
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

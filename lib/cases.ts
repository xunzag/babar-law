import data from "./cases-data.json";

export type CaseRow = {
  id: string;
  short: string;
  bench: string;
  number: number;
  year: number;
  seat: string;
  typeLabel: string;
  group: string;
  subject: string;
  role: string;
  status: "Disposed" | "Pending";
  filed: string;
  disposed: string;
  judgment: boolean;
  title: string;
};

export const cases: CaseRow[] = (data.rows as (string | number)[][]).map((r) => ({
  id: `${r[0]} ${r[1]}-${r[2]}/${r[3]}`,
  short: String(r[0]),
  bench: String(r[1]),
  number: Number(r[2]),
  year: Number(r[3]),
  seat: String(r[4]),
  typeLabel: String(r[5]),
  group: String(r[6]),
  subject: String(r[7]),
  role: String(r[8]),
  status: r[9] === "P" ? "Pending" : "Disposed",
  filed: String(r[10]),
  disposed: String(r[11]),
  judgment: r[12] === 1,
  title: String(r[13] ?? ""),
}));

const count = <T,>(items: T[], key: (t: T) => string) => {
  const m = new Map<string, number>();
  for (const it of items) m.set(key(it), (m.get(key(it)) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

const yearOf = (c: CaseRow) => (c.filed ? Number(c.filed.slice(0, 4)) : c.year);

export const casesSummary = {
  generated: data.generated as string,
  registered: data.registered as number,
  disposed: data.disposed as number,
  pending: data.pending as number,
  listed: cases.length,
  judgments: cases.filter((c) => c.judgment).length,
  seats: count(cases, (c) => c.seat).map(([s]) => s),
  groups: count(cases, (c) => c.group),
  subjects: count(cases, (c) => c.subject),
  byYear: count(cases, (c) => String(yearOf(c)))
    .map(([y, n]) => [Number(y), n] as [number, number])
    .filter(([y]) => y >= 2008)
    .sort((a, b) => a[0] - b[0]),
  firstYear: 2008,
};

export const fmtMonth = (ym: string) => {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(m) - 1]} ${y}`;
};

export const caseYear = yearOf;

// A varied sample of titled matters for the animated docket feed, newest first,
// interleaving pending, judgment and disposed matters so the feed never stalls on one kind.
export const docketSample = (n = 36) => {
  const titled = [...cases]
    .filter((c) => c.title && c.title.length > 8)
    .sort((a, b) => (b.filed || `${b.year}-00`).localeCompare(a.filed || `${a.year}-00`));
  const pending = titled.filter((c) => c.status === "Pending");
  const judged = titled.filter((c) => c.status !== "Pending" && c.judgment);
  const rest = titled.filter((c) => c.status !== "Pending" && !c.judgment);
  const out: CaseRow[] = [];
  for (let i = 0; out.length < n && i < titled.length; i++) {
    for (const pool of [rest, pending, judged, rest]) if (pool[i] && out.length < n) out.push(pool[i]);
  }
  return out.map((c) => ({
    id: `${c.short} ${c.bench}-${c.number}/${c.year}`,
    title: c.title.replace(/\s+VS\.?\s+/i, " v. ").replace(/\.$/, ""),
    subject: c.subject,
    seat: c.seat,
    role: c.role || "Counsel",
    status: c.status,
    judgment: c.judgment,
    when: c.filed ? fmtMonth(c.filed) : String(c.year),
  }));
};

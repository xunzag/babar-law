// Builds lib/cases-data.json from the High Court of Sindh case-register PDF export.
// Source PDF lives in data/source/ (gitignored).
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "node:fs";

const SRC = "data/source/grid-export.pdf";
const OUT = "lib/cases-data.json";
const MONTHS = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };

const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(SRC)) }).promise;

let header = "";
const raw = [];
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const items = (await page.getTextContent()).items.map((i) => ({ x: i.transform[4], y: i.transform[5], s: i.str }));
  if (p === 1) header = items.filter((i) => i.y > 900).map((i) => i.s).join(" ");
  const body = items.filter((i) => i.s.trim() && i.y > 60 && i.y < 875);
  const frag = body.filter((i) => i.x > 44 && i.x < 62 && /^\d+$/.test(i.s.trim())).sort((a, b) => b.y - a.y);
  const clusters = [];
  for (const f of frag) {
    const last = clusters[clusters.length - 1];
    const wrapped = last && f.s.trim().length === 1 && last.list.length === 1 && last.list[0].s.trim().length === 2 && last.y - f.y > 6 && last.y - f.y < 14;
    if (wrapped) last.list.push(f);
    else clusters.push({ y: f.y, list: [f] });
  }
  clusters.forEach((c, a) => {
    const top = a === 0 ? 875 : (clusters[a - 1].y + c.y) / 2;
    const bottom = a === clusters.length - 1 ? 60 : (c.y + clusters[a + 1].y) / 2;
    const band = body.filter((i) => i.y <= top && i.y > bottom);
    const col = (x0, x1) => band.filter((i) => i.x >= x0 && i.x < x1).sort((m, n) => n.y - m.y || m.x - n.x).map((i) => i.s.trim()).filter(Boolean).join(" ");
    raw.push({
      caseNo: col(60, 205),
      inst: col(205, 250).replace(/\s/g, ""),
      title: col(250, 445),
      side: col(445, 493).replace(/\s/g, ""),
      disp: col(493, 530).replace(/\s/g, ""),
      judg: /view/i.test(col(530, 600)),
    });
  });
}

const ym = (d) => {
  const m = d.match(/^\d{2}-([A-Z]{3})-(\d{2})$/);
  return m ? `${Number(m[2]) > 40 ? "19" : "20"}${m[2]}-${MONTHS[m[1]]}` : "";
};

const TYPE = {
  "Const. P.": ["Constitutional Petition", "Constitutional"],
  "Cr.Bail": ["Bail Application", "Bail"],
  "Cr.Appeal": ["Criminal Appeal", "Criminal appeals"],
  "Cr.Rev": ["Criminal Revision", "Criminal appeals"],
  "Cr.Tran": ["Criminal Transfer", "Criminal appeals"],
  "Cr.Misc. Appln": ["Criminal Misc. Application", "Criminal appeals"],
  "Civil Revision": ["Civil Revision", "Civil & commercial"],
  "Civil Tran": ["Civil Transfer", "Civil & commercial"],
  "H.C.A": ["High Court Appeal", "Civil & commercial"],
  "Misc Appeal": ["Miscellaneous Appeal", "Civil & commercial"],
  "Ist Appeal": ["First Appeal", "Civil & commercial"],
  "F.R.A": ["Rent Appeal", "Civil & commercial"],
  "Judicial Companies Misc.": ["Companies Matter", "Civil & commercial"],
};

function subject(type, nature = "") {
  const n = nature.toUpperCase();
  if (type === "Cr.Bail" || /BAIL/.test(n)) return /AFTER/.test(n) ? "Post-arrest bail" : /PROTECTIVE/.test(n) ? "Protective bail" : /BEFORE|PRE ARREST/.test(n) ? "Pre-arrest bail" : "Bail";
  if (TYPE[type]?.[1] === "Criminal appeals") return /TRANSFER/.test(n) ? "Transfer of case" : "Criminal proceedings";
  if (TYPE[type]?.[1] === "Civil & commercial") return /BANKING/.test(n) ? "Banking" : /SUCESSION|SUCCESSION/.test(n) ? "Succession" : /SECURITY EXCHANGE/.test(n) ? "Securities & companies" : /RENT/.test(n) ? "Rent" : "Civil & commercial";
  if (/SERVICE|APPOINTMENT|PENSION|SALARY|DECEASED QUOTA|ADMISSION/.test(n)) return "Service & employment";
  if (/PROPERTY|LAND|CONSTRUCTION|SOCIETIES|LEASE|RENT|ENCROACH|SANAD|CANTONMENT|DE-SEAL|ELECTRICITY|FUNDS/.test(n)) return "Property & land";
  if (/F\.I\.R|FIR|HARASS|DETENTION|PROTECTION|INVESTIGATION|MISSING|FREE-WILL|SECURITY|QUASH/.test(n)) return "Criminal process & liberty";
  if (/DUMPING|CUSTOM|TENDER|EXCHANGE|WINE|CIRCULAR|NOTICE|LETTER|REJECTION/.test(n)) return "Regulatory & commercial";
  if (/CUSTODY|FAMILY|CNIC|AGE/.test(n)) return "Family & personal";
  return "Other writ matters";
}

const re = /^(.*?)\s+([SD])-\s?-?(\d+)\/(\d{4})\s+(\S+)?\s*(?:\((.*)\))?\s*$/;
const rows = [];
for (const r of raw) {
  const m = r.caseNo.match(re);
  if (!m) continue;
  const [, type, bench, num, year, seat, nature] = m;
  const t = TYPE[type];
  if (!t) continue;
  const pending = !/\d/.test(r.disp);
  rows.push([type, bench, Number(num), Number(year), seat || "Karachi", t[0], t[1], subject(type, nature), r.side || "", pending ? "P" : "D", ym(r.inst), pending ? "" : ym(r.disp), r.judg ? 1 : 0, r.title]);
}

const totals = header.match(/Pending Cases\((\d+)\),\s*Disposed Off Cases\s*\((\d+)\)/);
const generated = header.match(/Generated:\s*(.*?\d{4})/)?.[1] ?? "";
const out = {
  generated,
  registered: totals ? Number(totals[1]) + Number(totals[2]) : rows.length,
  pending: totals ? Number(totals[1]) : rows.filter((r) => r[9] === "P").length,
  disposed: totals ? Number(totals[2]) : rows.filter((r) => r[9] === "D").length,
  // [shortType, bench, number, year, seat, typeLabel, group, subject, role, status, filed(YYYY-MM), disposed(YYYY-MM), judgment, title]
  rows,
};
fs.writeFileSync(OUT, JSON.stringify(out));
console.log(`rows ${rows.length}/${raw.length}`, "registered", out.registered, "pending(in export)", rows.filter((r) => r[9] === "P").length);

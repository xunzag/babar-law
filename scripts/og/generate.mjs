// Generates the link-preview image (Open Graph card) for every page into
// public/og/<key>.jpg, where <key> is the page path with "/" → "--"
// ("/" itself is "home"). lib/site.ts pageMeta() points each page at its file.
//
// Run after changing a page title or adding a page, practice area or article:
//   npx -y -p playwright@1.56 node scripts/og/generate.mjs
// (set CHROMIUM_PATH if Playwright's own browser is not installed)

import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { practicePages } = await import(path.join(root, "lib/practice.ts"));
const { articles } = await import(path.join(root, "lib/insights.ts"));

/** @type {{ key: string; eyebrow: string; title: string; sub?: string; image?: string; pos?: string }[]} */
const cards = [
  { key: "home", eyebrow: "Advocates & International Legal Consultants", title: "Litigation in Pakistan. Counsel across borders.", sub: "Lawyers and advocates in Karachi since 2004", image: "/assets/hero/supreme-court.jpg", pos: "center 45%" },
  { key: "about", eyebrow: "The Principal", title: "Ghulam Shabbir Babar", sub: "Advocate High Court · Attorney at Law, LLM (Europe)", image: "/assets/team/ghulam-shabbir-babar.jpg", pos: "center 22%" },
  { key: "associates", eyebrow: "Our lawyers", title: "Advocates of the High Court, Karachi.", sub: "The chambers of Babar Law Associates", image: "/assets/gallery/photo-25.jpg", pos: "center 30%" },
  { key: "cases", eyebrow: "Case portfolio", title: "A record before the High Court of Sindh.", image: "/assets/hero/gavel.jpg", pos: "center" },
  { key: "experience", eyebrow: "Experience", title: "Experience and appointments since 2004.", image: "/assets/gallery/photo-20.jpg", pos: "center 35%" },
  { key: "international", eyebrow: "International network", title: "Counsel in the US, Canada, Greece and Cyprus.", image: "/assets/gallery/photo-03.jpg", pos: "center 30%" },
  { key: "gallery", eyebrow: "Gallery", title: "At the courts, conferences and lectures.", image: "/assets/gallery/photo-13.jpg", pos: "center 35%" },
  { key: "faq", eyebrow: "FAQ", title: "Questions clients ask, answered.", sub: "Immigration, Golden Visa and consultations", image: "/assets/hero/justice-scale.png", pos: "center" },
  { key: "contact", eyebrow: "Consultations", title: "Book a consultation in Karachi or online.", sub: "Every enquiry reviewed by Mr. Babar personally", image: "/assets/team/ghulam-shabbir-babar.jpg", pos: "center 22%" },
  { key: "practice-areas", eyebrow: "Practice areas", title: "Litigation, immigration, banking and more.", image: "/assets/hero/lady-justice.jpg", pos: "center 30%" },
  { key: "insights", eyebrow: "Insights", title: "Guides from the chambers.", sub: "Immigration, Golden Visa and Pakistani law explained", image: "/assets/gallery/photo-11.jpg", pos: "center 30%" },
  { key: "privacy", eyebrow: "Legal", title: "Privacy policy" },
  { key: "cookies", eyebrow: "Legal", title: "Cookie policy" },
  { key: "terms", eyebrow: "Legal", title: "Terms of use & disclaimer" },
  ...practicePages.map((p) => ({ key: `practice-areas--${p.slug}`, eyebrow: "Practice area", title: p.title, image: p.hero, pos: p.heroPos })),
  ...articles.map((a) => ({ key: `insights--${a.slug}`, eyebrow: `Insights · ${a.category}`, title: a.title, sub: `By Ghulam Shabbir Babar · ${a.readMinutes} min read`, image: a.image, pos: a.imagePos })),
];

const asset = async (p) => {
  const buf = await readFile(path.join(root, "public", p));
  const type = p.endsWith(".png") ? "image/png" : p.endsWith(".woff2") ? "font/woff2" : "image/jpeg";
  return `data:${type};base64,${buf.toString("base64")}`;
};
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const font = `data:font/woff2;base64,${(await readFile(path.join(root, "scripts/og/inter-tight-latin.woff2"))).toString("base64")}`;
const mark = await asset("/assets/babar-law-mark.png");

async function html(c) {
  const photo = c.image ? await asset(c.image) : null;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Inter Tight"; src: url(${font}) format("woff2"); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #0a0c12; font-family: "Inter Tight", sans-serif; color: #f3ede2; overflow: hidden; position: relative; }
.frame { position: absolute; inset: 22px; border: 1px solid rgba(201,161,90,0.28); pointer-events: none; z-index: 5; }
.photo { position: absolute; top: 0; right: 0; bottom: 0; width: 520px; overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: ${c.pos || "center"}; filter: saturate(0.9) contrast(1.05); }
.photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, #0a0c12 0%, rgba(10,12,18,0.55) 22%, rgba(10,12,18,0) 55%), linear-gradient(0deg, rgba(10,12,18,0.35), transparent 40%); }
.seal { position: absolute; top: 0; right: 0; bottom: 0; width: 520px; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at 55% 50%, rgba(201,161,90,0.20), transparent 60%), #0d1017; }
.seal img { width: 300px; opacity: 0.95; }
.content { position: absolute; left: 70px; top: 62px; bottom: 58px; width: ${photo ? 640 : 600}px; display: flex; flex-direction: column; z-index: 2; }
.brand { display: flex; align-items: center; gap: 16px; }
.brand img { height: 40px; }
.brand b { font-size: 17px; font-weight: 650; letter-spacing: 0.2em; }
.brand span { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.32em; color: #c9a15a; margin-top: 4px; }
.main { margin-top: auto; margin-bottom: auto; padding-top: 10px; }
.eyebrow { display: flex; align-items: center; gap: 14px; color: #c9a15a; font-size: 15px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; margin-bottom: 22px; }
.eyebrow i { width: 34px; height: 2px; background: #c9a15a; }
h1 { font-size: 64px; font-weight: 700; line-height: 1.04; letter-spacing: -0.035em; color: #fff; }
.sub { margin-top: 20px; font-size: 22px; line-height: 1.4; color: rgba(243,237,226,0.7); font-weight: 450; }
.foot { display: flex; align-items: center; gap: 14px; font-size: 17px; color: rgba(243,237,226,0.8); padding-top: 22px; border-top: 1px solid rgba(243,237,226,0.12); }
.foot em { font-style: normal; color: rgba(243,237,226,0.45); }
.foot .dot { width: 4px; height: 4px; border-radius: 2px; background: #c9a15a; }
</style></head><body>
${photo ? `<div class="photo"><img src="${photo}"></div>` : `<div class="seal"><img src="${mark}"></div>`}
<div class="frame"></div>
<div class="content">
  <div class="brand"><img src="${mark}"><div><b>BABAR LAW</b><span>ASSOCIATES</span></div></div>
  <div class="main">
    <div class="eyebrow"><i></i>${esc(c.eyebrow)}</div>
    <h1 id="t">${esc(c.title)}</h1>
    ${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ""}
  </div>
  <div class="foot">babarlawassociates.com<span class="dot"></span><em>Karachi · New York</em></div>
</div>
</body></html>`;
}

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const c of cards) {
  await page.setContent(await html(c), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // Shrink long titles until they fit in three lines.
  await page.evaluate(() => {
    const t = document.getElementById("t");
    let size = 64;
    const lh = () => parseFloat(getComputedStyle(t).lineHeight);
    while (t.scrollHeight > lh() * 3 + 2 && size > 40) t.style.fontSize = `${(size -= 2)}px`;
  });
  const out = path.join(root, "public/og", `${c.key}.jpg`);
  await writeFile(out, await page.screenshot({ type: "jpeg", quality: 86 }));
  console.log("og", c.key);
}
await browser.close();

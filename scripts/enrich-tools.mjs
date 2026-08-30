import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "src/data/tools.json");
const outDir = path.join(root, "public/screenshots");
fs.mkdirSync(outDir, { recursive: true });

const catLabel = {
  dropshipping: "Dropshipping",
  pod: "Print-on-Demand",
  "email-sms": "Email & SMS",
  reviews: "Reviews & UGC",
  seo: "SEO & Analytics",
  cro: "CRO & Popups",
  subscription: "Subscriptions & Loyalty",
  fulfillment: "Fulfillment & Shipping",
  support: "Customer Support",
  storebuilder: "Store Builders",
  "content-ai": "AI Content",
  "ad-spy": "Ad Spy",
  payments: "Payments & FX",
};

const tools = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function wrap(text, max) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}
function firstSentence(s) {
  const m = String(s || "").split(/(?<=[.!?])\s/)[0];
  return m || String(s || "");
}

function svg(tool) {
  const h = hash(tool.id);
  const hue = h % 360;
  const hue2 = (hue + 38) % 360;
  const c1 = `hsl(${hue} 72% 56%)`;
  const c2 = `hsl(${hue2} 76% 44%)`;
  const stars = Math.max(0, Math.min(5, Math.round(tool.rating || 0)));
  const starStr = "★".repeat(stars) + "☆".repeat(5 - stars);
  const label = catLabel[tool.category] || tool.category;
  const tagSrc = tool.tagline || firstSentence(tool.review) || "";
  const tagLines = wrap(tagSrc, 40).slice(0, 3);
  const tagSvg = tagLines
    .map(
      (l, i) =>
        `<text x="300" y="${248 + i * 25}" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="16" fill="#374151">${esc(l)}</text>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <rect x="40" y="40" width="520" height="320" rx="22" fill="#ffffff" opacity="0.97"/>
  <circle cx="72" cy="72" r="6" fill="#ff5f56"/>
  <circle cx="94" cy="72" r="6" fill="#ffbd2e"/>
  <circle cx="116" cy="72" r="6" fill="#27c93f"/>
  <text x="300" y="128" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="34" font-weight="800" fill="#0f1115">${esc(tool.name)}</text>
  <rect x="222" y="146" width="156" height="30" rx="15" fill="${c1}" opacity="0.16"/>
  <text x="300" y="166" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="600" fill="${c2}">${esc(label)}</text>
  ${tagSvg}
  <text x="300" y="340" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="22" fill="#f5a623">${starStr}</text>
  <text x="300" y="364" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="15" fill="#6b7280">${esc((tool.rating || 0).toFixed(1))}/5 · ${esc(tool.pricing)}</text>
</svg>`;
}

function buildFaq(tool) {
  const label = catLabel[tool.category] || tool.category;
  const rating = tool.rating || 0;
  const intro =
    tool.tagline ||
    firstSentence(tool.review) ||
    `${tool.name} is a ${label} tool for DTC sellers.`;
  const worth =
    rating >= 4.3
      ? `Yes — ${tool.name} earns a ${rating.toFixed(1)}/5 editor rating and is a strong pick in the ${label} category for DTC and independent store operators.`
      : `${tool.name} holds a ${rating.toFixed(1)}/5 rating. It is a viable option in ${label} for stores that prioritize its specific strengths over broader alternatives.`;
  const cost = tool.commission
    ? `${tool.name} pricing: ${tool.pricing}. Affiliates earn ${tool.commission} with a ${tool.cookie} cookie window.`
    : `${tool.name} pricing: ${tool.pricing}.`;
  return [
    { q: `What is ${tool.name}?`, a: intro },
    { q: `How much does ${tool.name} cost?`, a: cost },
    { q: `Is ${tool.name} worth it for DTC brands?`, a: worth },
  ];
}

let count = 0;
for (const t of tools) {
  fs.writeFileSync(path.join(outDir, `${t.id}.svg`), svg(t));
  t.screenshot = `/screenshots/${t.id}.svg`;
  if (!Array.isArray(t.faq) || t.faq.length === 0) {
    t.faq = buildFaq(t);
  }
  count++;
}
fs.writeFileSync(dataPath, JSON.stringify(tools, null, 2) + "\n");
console.log(`Enriched ${count} tools: screenshots + FAQ written.`);

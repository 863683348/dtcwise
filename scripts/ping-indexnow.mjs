// Ping Bing/IndexNow with every indexable URL for dtcwise.com.
// Run after a deploy:  node scripts/ping-indexnow.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const KEY = "a1b2c3d4e5f60718293a4b5c6d7e8f90";
const HOST = (process.env.NEXT_PUBLIC_SITE_URL || "https://dtcwise.com").replace(/^https?:\/\//, "");
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const tools = JSON.parse(fs.readFileSync(path.join(root, "src/data/tools.json"), "utf8"));
const blog = JSON.parse(fs.readFileSync(path.join(root, "src/data/blog.json"), "utf8"));
const categories = [
  "dropshipping", "pod", "email-sms", "reviews", "seo", "cro", "subscription",
  "fulfillment", "support", "storebuilder", "content-ai", "ad-spy", "payments",
];

const urls = new Set();
urls.add(`https://${HOST}/`);
urls.add(`https://${HOST}/ranking/monthly`);
urls.add(`https://${HOST}/submit`);
for (const c of categories) urls.add(`https://${HOST}/category/${c}`);
for (const t of tools) {
  urls.add(`https://${HOST}/tool/${t.id}`);
  urls.add(`https://${HOST}/alternatives/${t.id}`);
}
for (const p of blog) urls.add(`https://${HOST}/blog/${p.slug}`);
// same-category compare pairs (mirrors getCompareSlugs in src/lib/tools.ts)
for (const cat of categories) {
  const list = tools.filter((t) => t.category === cat);
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      urls.add(`https://${HOST}/compare/${list[i].id}-vs-${list[j].id}`);
    }
  }
}

const urlList = [...urls];
const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body,
});
process.stderr.write(`IndexNow response: HTTP ${res.status} (${urlList.length} urls)\n`);
process.exit(res.ok ? 0 : 1);

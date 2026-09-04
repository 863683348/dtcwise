import data from "@/data/tools.json";

export interface Tool {
  id: string;
  name: string;
  category: string;
  pricing: string;
  commission: string;
  cookie: string;
  rating: number;
  pros: string[];
  cons: string[];
  review: string;
  affiliateUrl: string;
  affiliate: boolean;
  screenshot?: string;
  lastReviewed: string;
  featured?: boolean;
  tagline?: string;
  faq?: { q: string; a: string }[];
  // 深度评测扩展字段（P0：高展示深排名页提权，扩充到 800+ 字）
  longReview?: string[];
  bestFor?: string;
  pricingTiers?: { name: string; price: string; note: string }[];
}

export const tools = data as Tool[];

export const categories: { id: string; label: string; blurb: string }[] = [
  { id: "dropshipping", label: "Dropshipping", blurb: "Source and fulfill without holding inventory." },
  { id: "pod", label: "Print-on-Demand", blurb: "Sell custom-printed products with zero stock." },
  { id: "email-sms", label: "Email & SMS", blurb: "Own the relationship with automated flows." },
  { id: "reviews", label: "Reviews & UGC", blurb: "Turn customers into social proof." },
  { id: "seo", label: "SEO & Analytics", blurb: "Get found and measure what matters." },
  { id: "cro", label: "CRO & Popups", blurb: "Convert more of the traffic you already have." },
  { id: "subscription", label: "Subscriptions & Loyalty", blurb: "Build recurring revenue and retention." },
  { id: "fulfillment", label: "Fulfillment & Shipping", blurb: "Pick, pack and ship at scale." },
  { id: "support", label: "Customer Support", blurb: "Answer fast, keep buyers happy." },
  { id: "storebuilder", label: "Store Builders", blurb: "Launch and run your storefront." },
  { id: "content-ai", label: "AI Content", blurb: "Generate and dub content at scale." },
  { id: "ad-spy", label: "Ad Spy", blurb: "Reverse-engineer winning creatives." },
  { id: "payments", label: "Payments & FX", blurb: "Collect and move money globally." },
];

export function getTool(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getByCategory(cat: string): Tool[] {
  return tools.filter((t) => t.category === cat);
}

export function getFeatured(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function categoryLabel(cat: string): string {
  return categories.find((c) => c.id === cat)?.label ?? cat;
}

// 同品类两两配对，用于程序化生成对比页（避免无意义跨类对比）
export function getCompareSlugs(): string[] {
  const slugs: string[] = [];
  for (const cat of categories) {
    const list = getByCategory(cat.id);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        slugs.push(`${list[i].id}-vs-${list[j].id}`);
      }
    }
  }
  return slugs;
}

export function parseCompareSlug(slug: string): [Tool, Tool] | null {
  const [a, b] = slug.split("-vs-");
  if (!a || !b) return null;
  const ta = getTool(a);
  const tb = getTool(b);
  if (!ta || !tb || ta.category !== tb.category) return null;
  return [ta, tb];
}

export function getAlternatives(id: string): Tool[] {
  const tool = getTool(id);
  if (!tool) return [];
  return getByCategory(tool.category).filter((t) => t.id !== id);
}

// 找一个包含该工具的对比页 slug（用于工具页内链「head-to-head」）
export function getCompareFor(id: string): string | null {
  const slug = getCompareSlugs().find(
    (s) => s.startsWith(`${id}-vs-`) || s.endsWith(`-vs-${id}`)
  );
  return slug ?? null;
}

// 月度榜单：评分降序，featured 优先
export function getMonthlyRanking(limit = 20): Tool[] {
  return [...tools]
    .sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return b.rating - a.rating;
    })
    .slice(0, limit);
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dtcwise.com";

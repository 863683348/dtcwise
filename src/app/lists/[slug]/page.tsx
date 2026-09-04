import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

interface ListDef {
  slug: string;
  title: string;
  intro: string;
  picks: string[]; // tool ids
  editorial: string;
}

const LISTS: ListDef[] = [
  {
    slug: "best-dropshipping-suppliers-usa",
    title: "Best Dropshipping Suppliers in the USA (2026)",
    intro:
      "If your customers are in the US, shipping speed is your conversion lever. These suppliers run US warehouses or US-based fulfillment so you can promise domestic delivery times.",
    picks: ["zendrop", "spocket", "sellvia"],
    editorial:
      "Zendrop and Sellvia own US warehouses for 2\u20135 day delivery; Spocket blends US/EU suppliers with faster shipping than pure AliExpress sourcing. We lead with Zendrop for speed-obsessed stores and Spocket for catalog breadth.",
  },
  {
    slug: "best-shopify-dropshipping-tools",
    title: "Best Shopify Dropshipping Tools (2026)",
    intro:
      "The tools below plug directly into Shopify and cover sourcing, fulfillment and automation for a dropshipping storefront.",
    picks: ["spocket", "dsers", "zendrop", "autods", "modalyst", "syncee"],
    editorial:
      "DSers is the go-to for AliExpress-native bulk ordering; Spocket and Zendrop add US/EU speed; AutoDS automates multi-channel sourcing. Pick by where your suppliers live, not by which has the biggest ad budget.",
  },
];

export function generateStaticParams() {
  return LISTS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const list = LISTS.find((l) => l.slug === params.slug);
  if (!list) return {};
  return buildMetadata({
    title: list.title,
    description: list.intro,
    path: `/lists/${list.slug}`,
    keywords: ["dropshipping", "Shopify", "suppliers", "USA"],
  });
}

export default function ListPage({ params }: { params: { slug: string } }) {
  const list = LISTS.find((l) => l.slug === params.slug);
  if (!list) notFound();
  const picks = list.picks.map((id) => getTool(id)).filter(Boolean);

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <Link href="/category/dropshipping" className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; Dropshipping tools
      </Link>
      <h1 style={{ fontSize: 30, margin: "14px 0 8px" }}>{list.title}</h1>
      <p className="muted" style={{ marginTop: 0, maxWidth: 720, lineHeight: 1.7 }}>{list.intro}</p>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {picks.map((t) => (
          <ToolCard key={t!.id} tool={t!} />
        ))}
      </div>

      <div className="card" style={{ marginTop: 28, padding: 20, background: "var(--surface)" }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>At a glance</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 520 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "8px 10px" }}>Tool</th>
                <th style={{ padding: "8px 10px" }}>Pricing</th>
                <th style={{ padding: "8px 10px" }}>Rating</th>
                <th style={{ padding: "8px 10px" }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((t) => (
                <tr key={t!.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "8px 10px" }}>
                    <Link href={`/tool/${t!.id}`} style={{ textDecoration: "none", fontWeight: 600 }}>{t!.name}</Link>
                  </td>
                  <td style={{ padding: "8px 10px" }}>{t!.pricing}</td>
                  <td style={{ padding: "8px 10px" }}>
                    <span className="stars">{"\u2605"} {t!.rating.toFixed(1)}</span>
                  </td>
                  <td style={{ padding: "8px 10px" }} className="muted">{t!.tagline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24, padding: 20 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>How to choose</h2>
        <p className="muted" style={{ lineHeight: 1.7, margin: 0 }}>
          Lead with where your suppliers live. If you want US/EU delivery speed, weight Spocket and Zendrop
          higher; if you source from AliExpress at scale, DSers is the bulk-ordering default; if you want
          hands-off multi-channel automation, AutoDS and Syncee earn their place. Match the tool to your
          shipping promise, not to the biggest ad budget \u2014 then open any review above for the full pros and cons.
        </p>
      </div>

      <div className="card" style={{ marginTop: 28, padding: 20, background: "var(--surface)" }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Editor&apos;s take</h2>
        <p className="muted" style={{ lineHeight: 1.7, margin: 0 }}>{list.editorial}</p>
      </div>
    </div>
  );
}

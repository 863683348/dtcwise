import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { buildMetadata } from "@/lib/seo";
import {
  tools,
  getTool,
  getAlternatives,
  categoryLabel,
} from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTool(params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.name} Review \u2014 Pricing, Pros & Cons`,
    description: `${t.name} review: ${t.tagline ? t.tagline + ". " : ""}Pricing ${t.pricing}, editor rating ${t.rating}/5, with pros, cons and real assessment for DTC sellers.`,
    path: `/tool/${t.id}`,
    keywords: [t.name, t.category, "DTC tools", "review"],
  });
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(tool.id);
  const rel = tool.affiliate ? "nofollow sponsored noopener" : "nofollow noopener";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    category: categoryLabel(tool.category),
    description: tool.review,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      ratingCount: 1,
    },
    offers: { "@type": "Offer", price: tool.pricing, priceCurrency: "USD" },
  };

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href={`/category/${tool.category}`} className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; {categoryLabel(tool.category)}
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 32 }}>{tool.name}</h1>
            <span className="stars" style={{ fontSize: 18 }}>{"\u2605".repeat(Math.round(tool.rating))}</span>
            <span className="muted" style={{ fontSize: 14 }}>{tool.rating.toFixed(1)}/5</span>
          </div>
          {tool.tagline && <p className="muted" style={{ fontSize: 17, marginTop: 8 }}>{tool.tagline}</p>}

          <dl style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "8px 16px", marginTop: 20, fontSize: 14 }}>
            <dt className="muted">Pricing</dt>
            <dd style={{ margin: 0 }}>{tool.pricing}</dd>
            <dt className="muted">Commission</dt>
            <dd style={{ margin: 0 }}>{tool.commission}</dd>
            <dt className="muted">Cookie window</dt>
            <dd style={{ margin: 0 }}>{tool.cookie}</dd>
            <dt className="muted">Last reviewed</dt>
            <dd style={{ margin: 0 }}>{tool.lastReviewed}</dd>
          </dl>

          <a
            href={tool.affiliateUrl}
            target="_blank"
            rel={rel}
            className="btn-brand"
            style={{ marginTop: 20 }}
          >
            {tool.affiliate ? `Try ${tool.name}` : `Visit ${tool.name}`}
          </a>
        </div>

        <div className="card" style={{ flex: 2, minWidth: 300, padding: 20 }}>
          <h2 style={{ marginTop: 0, fontSize: 20 }}>Our take</h2>
          <p style={{ lineHeight: 1.7 }}>{tool.review}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, color: "var(--brand-ink)" }}>Pros</h3>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8 }}>
                {tool.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 16, color: "#b42318" }}>Cons</h3>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8 }}>
                {tool.cons.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {alternatives.length > 0 && (
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, marginBottom: 16 }}>Alternatives to {tool.name}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {alternatives.map((a) => (
              <ToolCard key={a.id} tool={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

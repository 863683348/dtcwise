import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { buildMetadata } from "@/lib/seo";
import { tools, getTool, getAlternatives, categoryLabel, siteUrl } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTool(params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.name} Alternatives \u2014 ${categoryLabel(t.category)} tools`,
    description: `The best ${t.name} alternatives for DTC sellers: compare ${categoryLabel(t.category)} tools with similar features and pricing.`,
    path: `/alternatives/${t.id}`,
    keywords: [`${t.name} alternatives`, categoryLabel(t.category), "DTC tools"],
  });
}

export default function AlternativesPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();
  const alts = getAlternatives(tool.id);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: categoryLabel(tool.category), item: `${siteUrl}/category/${tool.category}` },
      { "@type": "ListItem", position: 3, name: `${tool.name} alternatives`, item: `${siteUrl}/alternatives/${tool.id}` },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: "BusinessApplication",
          category: categoryLabel(tool.category),
          description: tool.review,
          aggregateRating: { "@type": "AggregateRating", ratingValue: tool.rating, bestRating: 5, ratingCount: 1 },
          offers: { "@type": "Offer", price: tool.pricing, priceCurrency: "USD" },
        },
      },
      ...alts.map((a, i) => ({
        "@type": "ListItem",
        position: i + 2,
        item: {
          "@type": "SoftwareApplication",
          name: a.name,
          applicationCategory: "BusinessApplication",
          category: categoryLabel(a.category),
          description: a.review,
          aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, bestRating: 5, ratingCount: 1 },
          offers: { "@type": "Offer", price: a.pricing, priceCurrency: "USD" },
        },
      })),
    ],
  };

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href={`/tool/${tool.id}`} className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; {tool.name} review
      </Link>
      <h1 style={{ fontSize: 30, margin: "14px 0 4px" }}>
        {tool.name} Alternatives
      </h1>

      <p className="muted" style={{ marginTop: 0, maxWidth: 700, lineHeight: 1.7 }}>
        No single tool fits every store. The {categoryLabel(tool.category).toLowerCase()} tools below are the
        ones our editors shortlist as alternatives to {tool.name} \u2014 each with its own pricing,
        strengths and trade-offs. Compare them side by side, then open any full review.
      </p>

      <div
        className="card"
        style={{ marginTop: 20, padding: 18, background: "var(--surface)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
      >
        <div>
          <h3 style={{ fontSize: 16, color: "var(--brand-ink)", margin: "0 0 8px" }}>What {tool.name} does well</h3>
          <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8 }}>
            {tool.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: 16, color: "#b42318", margin: "0 0 8px" }}>Where {tool.name} falls short</h3>
          <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8 }}>
            {tool.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>
        {alts.length} {categoryLabel(tool.category).toLowerCase()} tools our editors consider as alternatives to {tool.name}.
      </p>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {alts.map((a) => (
          <ToolCard key={a.id} tool={a} />
        ))}
      </div>
    </div>
  );
}

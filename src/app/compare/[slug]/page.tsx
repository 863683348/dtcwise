import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import {
  parseCompareSlug,
  categoryLabel,
  siteUrl,
} from "@/lib/tools";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pair = parseCompareSlug(params.slug);
  if (!pair) return {};
  const [a, b] = pair;
  return buildMetadata({
    title: `${a.name} vs ${b.name} \u2014 Which is better for DTC?`,
    description: `Compare ${a.name} and ${b.name}: pricing, commission, ratings, pros and cons. An editor-assessed head-to-head for ${categoryLabel(a.category)} tools.`,
    path: `/compare/${params.slug}`,
    keywords: [a.name, b.name, "compare", categoryLabel(a.category)],
  });
}

function Row({ label, a, b }: { label: string; a: ReactNode; b: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 140px 1fr",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ padding: "12px 14px" }}>{a}</div>
      <div className="muted" style={{ padding: "12px 14px", textAlign: "center", fontWeight: 600, fontSize: 13 }}>
        {label}
      </div>
      <div style={{ padding: "12px 14px", textAlign: "right" }}>{b}</div>
    </div>
  );
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const pair = parseCompareSlug(params.slug);
  if (!pair) notFound();
  const [a, b] = pair;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: categoryLabel(a.category), item: `${siteUrl}/category/${a.category}` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: `${siteUrl}/compare/${params.slug}` },
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
          name: a.name,
          applicationCategory: "BusinessApplication",
          category: categoryLabel(a.category),
          description: a.review,
          aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, bestRating: 5, ratingCount: 1 },
          offers: { "@type": "Offer", price: a.pricing, priceCurrency: "USD" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareApplication",
          name: b.name,
          applicationCategory: "BusinessApplication",
          category: categoryLabel(b.category),
          description: b.review,
          aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, bestRating: 5, ratingCount: 1 },
          offers: { "@type": "Offer", price: b.pricing, priceCurrency: "USD" },
        },
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which is better, ${a.name} or ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${a.name} and ${b.name} serve the same ${categoryLabel(a.category).toLowerCase()} use case with different strengths. Compare the pricing, pros and cons above, then pick by your budget, shipping or target regions, and must-have features. There is no single winner \u2014 only the better fit for your store.`,
        },
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <Link href={`/category/${a.category}`} className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; {categoryLabel(a.category)}
      </Link>
      <h1 style={{ fontSize: 30, margin: "14px 0 4px" }}>
        {a.name} vs {b.name}
      </h1>
      <p className="muted" style={{ marginTop: 0 }}>
        An editor-assessed head-to-head for {categoryLabel(a.category)} tools.
      </p>

      <div className="card" style={{ marginTop: 24, overflow: "hidden" }}>
        <Row
          label="Rating"
          a={<span className="stars">{"\u2605"} {a.rating.toFixed(1)}</span>}
          b={<span className="stars">{"\u2605"} {b.rating.toFixed(1)}</span>}
        />
        <Row label="Pricing" a={a.pricing} b={b.pricing} />
        <Row label="Commission" a={a.commission} b={b.commission} />
        <Row label="Cookie" a={a.cookie} b={b.cookie} />
        <Row label="Pros" a={<ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>{a.pros.map((p) => <li key={p}>{p}</li>)}</ul>} b={<ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>{b.pros.map((p) => <li key={p}>{p}</li>)}</ul>} />
        <Row label="Cons" a={<ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>{a.cons.map((c) => <li key={c}>{c}</li>)}</ul>} b={<ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>{b.cons.map((c) => <li key={c}>{c}</li>)}</ul>} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>{a.name}</h3>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{a.review}</p>
          <a href={a.affiliateUrl} target="_blank" rel={a.affiliate ? "nofollow sponsored noopener" : "nofollow noopener"} className="btn-brand" style={{ width: "100%" }}>
            {a.affiliate ? `Try ${a.name}` : `Visit ${a.name}`}
          </a>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>{b.name}</h3>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{b.review}</p>
          <a href={b.affiliateUrl} target="_blank" rel={b.affiliate ? "nofollow sponsored noopener" : "nofollow noopener"} className="btn-brand" style={{ width: "100%" }}>
            {b.affiliate ? `Try ${b.name}` : `Visit ${b.name}`}
          </a>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24, padding: 18, background: "var(--surface)" }}>
        <h3 style={{ marginTop: 0, fontSize: 17 }}>How to choose between {a.name} and {b.name}</h3>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          Both tools are editors&apos; picks in {categoryLabel(a.category)}. Start from the row that matters most
          to your store \u2014 usually pricing and the pros/cons above \u2014 then weigh shipping or target regions
          and the features you will actually use. The &ldquo;better&rdquo; tool is the one that fits your budget and
          catalog, not the one with the higher editor score.
        </p>
      </div>

      <p className="muted" style={{ fontSize: 13, marginTop: 24 }}>
        Both tools are editors&apos; picks in {categoryLabel(a.category)}. Your best fit
        depends on shipping regions, budget and catalog needs \u2014 compare the pros and cons above.
      </p>
    </div>
  );
}

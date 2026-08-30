import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import {
  getCompareSlugs,
  parseCompareSlug,
  categoryLabel,
} from "@/lib/tools";

export function generateStaticParams() {
  return getCompareSlugs().map((slug) => ({ slug }));
}

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

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
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

      <p className="muted" style={{ fontSize: 13, marginTop: 24 }}>
        Both tools are editors&apos; picks in {categoryLabel(a.category)}. Your best fit
        depends on shipping regions, budget and catalog needs \u2014 compare the pros and cons above.
      </p>
    </div>
  );
}

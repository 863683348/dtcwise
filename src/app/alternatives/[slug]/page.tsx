import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { buildMetadata } from "@/lib/seo";
import { tools, getTool, getAlternatives, categoryLabel } from "@/lib/tools";

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

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <Link href={`/tool/${tool.id}`} className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; {tool.name} review
      </Link>
      <h1 style={{ fontSize: 30, margin: "14px 0 4px" }}>
        {tool.name} Alternatives
      </h1>
      <p className="muted" style={{ marginTop: 0 }}>
        {alts.length} {categoryLabel(tool.category)} tools our editors consider as
        alternatives to {tool.name}.
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

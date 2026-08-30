import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { buildMetadata } from "@/lib/seo";
import { categories, getByCategory } from "@/lib/tools";

export function generateStaticParams() {
  return categories.map((c) => ({ cat: c.id }));
}

export function generateMetadata({ params }: { params: { cat: string } }): Metadata {
  const cat = categories.find((c) => c.id === params.cat);
  if (!cat) return {};
  return buildMetadata({
    title: `Best ${cat.label} Tools for DTC Sellers`,
    description: `A curated, editor-assessed list of the best ${cat.label.toLowerCase()} tools for direct-to-consumer and independent store sellers.`,
    path: `/category/${cat.id}`,
    keywords: [cat.label, "DTC tools", "best tools"],
  });
}

export default function CategoryPage({ params }: { params: { cat: string } }) {
  const cat = categories.find((c) => c.id === params.cat);
  if (!cat) notFound();
  const list = getByCategory(cat.id);

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <Link href="/" className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; All categories
      </Link>
      <h1 style={{ fontSize: 30, margin: "14px 0 4px" }}>{cat.label} tools</h1>
      <p className="muted" style={{ marginTop: 0, maxWidth: 640 }}>{cat.blurb}</p>
      <p className="muted" style={{ fontSize: 13 }}>
        {list.length} tools reviewed and ranked by the DTCwise editors.
      </p>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {list.map((t) => (
          <ToolCard key={t.id} tool={t} />
        ))}
      </div>
    </div>
  );
}

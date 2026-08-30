import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { categoryLabel } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const rel = tool.affiliate ? "nofollow sponsored noopener" : "nofollow noopener";
  return (
    <article className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
            <Link href={`/tool/${tool.id}`} style={{ textDecoration: "none" }}>
              {tool.name}
            </Link>
          </h3>
          <span className="badge" style={{ marginTop: 6 }}>{categoryLabel(tool.category)}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="stars" style={{ fontSize: 14 }}>{"\u2605".repeat(Math.round(tool.rating))}</div>
          <div className="muted" style={{ fontSize: 12 }}>{tool.rating.toFixed(1)}</div>
        </div>
      </div>

      {tool.tagline && <p className="muted" style={{ margin: 0, fontSize: 14 }}>{tool.tagline}</p>}

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }} className="muted">
        <span>{tool.pricing}</span>
        {tool.affiliate && <span style={{ color: "var(--brand-ink)" }}>{tool.commission}</span>}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Link href={`/tool/${tool.id}`} className="btn-ghost" style={{ flex: 1 }}>
          Review
        </Link>
        <a href={tool.affiliateUrl} target="_blank" rel={rel} className="btn-brand" style={{ flex: 1 }}>
          {tool.affiliate ? "Try it" : "Visit"}
        </a>
      </div>
    </article>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getMonthlyRanking, categoryLabel } from "@/lib/tools";

export const metadata: Metadata = buildMetadata({
  title: "Monthly DTC Tool Rankings",
  description:
    "The DTCwise monthly ranking of the best tools for direct-to-consumer sellers, editor-assessed across every category.",
  path: "/ranking/monthly",
});

export default function MonthlyRanking() {
  const ranking = getMonthlyRanking(20);

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <h1 style={{ fontSize: 30, margin: "0 0 4px" }}>Monthly DTC Tool Rankings</h1>
      <p className="muted" style={{ marginTop: 0, maxWidth: 640 }}>
        Updated monthly by the DTCwise editors. Ranked by editor rating and category
        leadership \u2014 not by advertising.
      </p>

      <ol style={{ padding: 0, margin: "24px 0 0", listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {ranking.map((t, i) => (
          <li key={t.id} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontWeight: 800, color: "var(--brand)", minWidth: 28, fontSize: 18 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <Link href={`/tool/${t.id}`} style={{ fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                {t.name}
              </Link>
              <div className="muted" style={{ fontSize: 13 }}>
                {categoryLabel(t.category)} {t.featured ? "\u00b7 Editor&apos;s pick" : ""}
              </div>
            </div>
            <span className="stars" style={{ fontSize: 14 }}>{"\u2605"} {t.rating.toFixed(1)}</span>
            <a
              href={t.affiliateUrl}
              target="_blank"
              rel={t.affiliate ? "nofollow sponsored noopener" : "nofollow noopener"}
              className="btn-brand"
              style={{ padding: "8px 14px" }}
            >
              {t.affiliate ? "Try it" : "Visit"}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toolsData from "@/data/tools.json";
import ToolCard from "@/components/ToolCard";
import { categories } from "@/lib/tools";
import type { Tool } from "@/lib/tools";

export default function ToolSearch() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const tools = toolsData as Tool[];

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return tools
      .filter((t) => (cat === "all" ? true : t.category === cat))
      .filter((t) =>
        query === ""
          ? true
          : t.name.toLowerCase().includes(query) ||
            t.tagline?.toLowerCase().includes(query) ||
            t.category.toLowerCase().includes(query)
      )
      .slice(0, 12);
  }, [q, cat, tools]);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools (e.g. email, printful, spocket)..."
          aria-label="Search tools"
          style={{
            flex: 1,
            minWidth: 240,
            padding: "12px 14px",
            border: "1px solid var(--border)",
            borderRadius: 10,
            background: "var(--bg)",
            color: "var(--text)",
            fontSize: 15,
          }}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          aria-label="Filter by category"
          style={{
            padding: "12px 14px",
            border: "1px solid var(--border)",
            borderRadius: 10,
            background: "var(--bg)",
            color: "var(--text)",
            fontSize: 15,
          }}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {results.length === 0 ? (
        <p className="muted" style={{ marginTop: 20 }}>
          No tools match. Try a broader term, or{" "}
          <Link href="/submit" style={{ color: "var(--brand)" }}>
            list a tool
          </Link>
          .
        </p>
      ) : (
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {results.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}

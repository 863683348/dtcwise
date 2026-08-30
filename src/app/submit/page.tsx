"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const TIERS = [
  { id: "basic", name: "Basic", price: "$49", note: "Listed in one category, standard placement." },
  { id: "featured", name: "Featured", price: "$199", note: "Homepage editor's picks + category highlight." },
  { id: "premium", name: "Premium", price: "$497", note: "Homepage + comparison pages + monthly newsletter mention." },
];

export default function SubmitPage() {
  const [tier, setTier] = useState("basic");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", url: "", notes: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = `DTCwise listing request \u2014 ${TIERS.find((t) => t.id === tier)?.name}`;
    const body = `Tool/brand: ${form.name}\nContact email: ${form.email}\nWebsite: ${form.url}\nTier: ${tier}\nNotes: ${form.notes}`;
    window.location.href = `mailto:listings@dtcwise.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <div className="container-page" style={{ paddingTop: 32, paddingBottom: 40, maxWidth: 760 }}>
      <h1 style={{ fontSize: 30, margin: "0 0 4px" }}>List your tool</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        Reach motivated, high-intent DTC and independent-store operators. Listing requests
        are reviewed by editors within 2 business days.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 12, margin: "24px 0" }}>
        {TIERS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTier(t.id)}
            className="card"
            style={{
              padding: 16,
              textAlign: "left",
              cursor: "pointer",
              border: tier === t.id ? "2px solid var(--brand)" : "1px solid var(--border)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</div>
            <div style={{ color: "var(--brand-ink)", fontWeight: 700, fontSize: 20, margin: "4px 0" }}>{t.price}</div>
            <div className="muted" style={{ fontSize: 13 }}>{t.note}</div>
          </button>
        ))}
      </div>

      {submitted ? (
        <div className="card" style={{ padding: 24, textAlign: "center" }}>
          <h2 style={{ marginTop: 0 }}>Request ready</h2>
          <p className="muted">Your email client should have opened with the listing details. We&apos;ll reply within 2 business days.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
            <span className="muted">Tool / brand name</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
            <span className="muted">Contact email</span>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
            <span className="muted">Website URL</span>
            <input required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
            <span className="muted">Anything we should know? (optional)</span>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} style={inputStyle} />
          </label>
          <button type="submit" className="btn-brand" style={{ marginTop: 4 }}>
            Request listing ({TIERS.find((t) => t.id === tier)?.price})
          </button>
          <p className="muted" style={{ fontSize: 12, margin: 0 }}>
            By submitting you agree to our editorial review. Listings are not guaranteed and
            are assessed for fit and quality.
          </p>
        </form>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "var(--bg)",
  color: "var(--text)",
  fontSize: 15,
} as const;

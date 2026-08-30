"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("ok");
        setMsg("You're in. Watch your inbox for the next DTC playbook.");
        setEmail("");
      } else {
        setStatus("err");
        setMsg(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <section
      className="card"
      style={{ marginTop: 56, padding: 28, textAlign: "center", background: "var(--surface)" }}
    >
      <h2 style={{ marginTop: 0 }}>Get the DTC playbook in your inbox</h2>
      <p className="muted" style={{ maxWidth: 560, margin: "8px auto 18px" }}>
        Editor-tested tool reviews, winning-product teardowns and CRO tactics — one sharp email a
        week. No spam, unsubscribe anytime.
      </p>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          gap: 8,
          maxWidth: 460,
          margin: "0 auto",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourstore.com"
          style={{
            flex: 1,
            minWidth: 200,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            fontSize: 15,
            background: "var(--bg)",
            color: "var(--text)",
          }}
        />
        <button type="submit" className="btn-brand" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {msg && (
        <p
          className="muted"
          style={{ marginTop: 12, fontSize: 14, color: status === "ok" ? "var(--brand-ink)" : undefined }}
        >
          {msg}
        </p>
      )}
    </section>
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#0f1115",
          backgroundImage:
            "linear-gradient(135deg, #0f1115 0%, #1e293b 60%, #0ea5e9 100%)",
          color: "#e8eaed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#38bdf8",
            }}
          >
            DTCwise
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              fontWeight: 600,
              color: "#0f1115",
              backgroundColor: "#38bdf8",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            Blog
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#ffffff",
              maxWidth: 1000,
            }}
          >
            DTCwise Blog
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#9aa0a6",
            }}
          >
            Guides, comparisons and tool reviews for DTC sellers
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#9aa0a6" }}>
          dtcwise.com/blog
        </div>
      </div>
    ),
    { ...size }
  );
}

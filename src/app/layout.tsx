import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dtcwise.com";

// GA4 测量 ID：默认 DTCwise 的 G-Q5Z6T14T84；
// 如需换号，在 Vercel 项目里设环境变量 NEXT_PUBLIC_GA_ID 覆盖即可，不用改代码。
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Q5Z6T14T84";
// 只在生产构建加载，避免本地 npm run dev 的流量污染统计数据
// （Vercel 生产/预览部署都是 NODE_ENV=production，会正常加载）
const enableGA = process.env.NODE_ENV === "production" && Boolean(GA_ID);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DTCwise \u2014 The curated directory of DTC tools",
    template: "%s | DTCwise",
  },
  description:
    "DTCwise is the curated directory of tools that actually grow direct-to-consumer brands \u2014 real reviews, comparisons and a monthly ranking across dropshipping, POD, email, SEO, CRO and more.",
  openGraph: {
    title: "DTCwise \u2014 The curated directory of DTC tools",
    description:
      "Real reviews and comparisons of tools for independent store and DTC sellers.",
    siteName: "DTCwise",
    type: "website",
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('dtcwise-theme');
    if (!t) { t = 'light'; }
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) { document.documentElement.setAttribute('data-theme','light'); }
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />

        {enableGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

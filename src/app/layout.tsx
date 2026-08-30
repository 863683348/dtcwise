import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dtcwise.com";

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
      </body>
    </html>
  );
}

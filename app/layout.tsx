import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/lib/query-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const title = "The EverRest Journal";
const description =
  "Stories, insights and guidance for navigating loss and preparing for the future — from care advisors, funeral directors and grief counsellors.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog.everrest.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s — The EverRest Journal" },
  description,
  openGraph: {
    title,
    description,
    siteName: "The EverRest Journal",
    type: "website",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630, alt: "EverRest" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/img/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://facet.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Facet — AI Operational Intelligence",
    template: "%s — Facet",
  },
  description:
    "Facet is an AI Operational Intelligence (AIOI) platform: capture a canonical operational fact once from any AI framework, and project it into Governance, Analytics, FinOps, Execution Intelligence, Oversight Intelligence, Trust/Risk/Threat Intelligence and Executive Intelligence.",
  openGraph: {
    title: "Facet — AI Operational Intelligence",
    description:
      "Capture once, project many times: Governance, Analytics, FinOps, Execution, Oversight, Trust/Risk/Threat and Executive Intelligence for any AI framework.",
    url: SITE_URL,
    siteName: "Facet",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

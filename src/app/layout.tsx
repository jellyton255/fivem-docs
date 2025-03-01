import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { config } from "@fortawesome/fontawesome-svg-core";
import Shell from "./shell";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: "%s | FiveM Docs",
    default: "FiveM Docs",
  },
  description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
  keywords: ["FiveM", "server", "gta", "gtav", "gta5", "gta v", "gta 5", "fivem", "gta 6", "gta vi", "gta six"],
  openGraph: {
    title: {
      template: "%s | FiveM Docs",
      default: "FiveM Docs",
    },
    siteName: "FiveM Docs",
    url: new URL("https://fivemdocs.jellyton.me/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://runtime.fivem.net" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NuqsAdapter>
          <Shell>{children}</Shell>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}

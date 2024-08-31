import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Shell from "./shell";
import "./globals.css";
import "highlight.js/styles/monokai.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

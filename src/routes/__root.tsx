import type { ReactNode } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Shell from "./shell";
import "@fortawesome/fontawesome-svg-core/styles.css";
import appCss from "../styles.css?url";

config.autoAddCss = false;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "FiveM Docs",
      },
      {
        name: "description",
        content: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      },
      {
        name: "keywords",
        content: "FiveM, server, gta, gtav, gta5, gta v, gta 5, fivem, gta 6, gta vi, gta six",
      },
      {
        name: "color-scheme",
        content: "dark",
      },
      {
        property: "og:title",
        content: "FiveM Docs",
      },
      {
        property: "og:description",
        content: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      },
      {
        property: "og:site_name",
        content: "FiveM Docs",
      },
      {
        property: "og:url",
        content: "https://fivemdocs.jellyton.me/",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "dns-prefetch",
        href: "https://runtime.fivem.net",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <NuqsAdapter>
        <Shell>
          <Outlet />
        </Shell>
      </NuqsAdapter>
      <Analytics />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background min-h-screen font-sans antialiased">
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

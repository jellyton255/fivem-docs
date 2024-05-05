import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Shell from "./shell";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/spotlight/styles.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "FiveM Docs",
	description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<head>
				<ColorSchemeScript forceColorScheme="dark" />
			</head>
			<body>
				<MantineProvider
					defaultColorScheme="dark"
					theme={{
						primaryColor: "cfx",
						colors: {
							cfx: ["#ffe8f2", "#ffcfdf", "#fe9dbc", "#fc6897", "#fa3c78", "#f92064", "#fa0e5a", "#df004b", "#c80041", "#b00037"],
							dark: ["#C1C2C5", "#A6A7AB", "#909296", "#5c5f66", "#373A40", "#2C2E33", "#25262b", "#131313", "#141517", "#101113"],
						},
					}}>
					<Shell>{children}</Shell>
				</MantineProvider>
			</body>
		</html>
	);
}

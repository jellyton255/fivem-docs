import { AppShell } from "@mantine/core";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import { useEffect, useMemo } from "react";

import NavBar from "./components/NavBar/NavBar";
import { useNativesStore } from "./stores/NativesStore";

import natives from "./natives.json";
import natives_cfx from "./natives_cfx.json";
import { Natives } from "./types/Natives";
import DocPage from "./components/DocPage/DocPage";

export default function App() {
	const location = useLocation();

	const vNatives = natives as Record<string, Record<string, Natives>>;
	const cfxNatives = natives_cfx as Record<string, Record<string, Natives>>;

	const allNatives = { ...cfxNatives, ...vNatives };

	useNativesStore.getState().addNatives(allNatives);

	useEffect(() => {
		if (location.hash) {
			const element = document.getElementById(location.hash.slice(1));
			if (element) {
				element.scrollIntoView();
			}
		}
	}, [location]);

	const docRoutes = useMemo(() => {
		const routes = [];

		for (const [categoryName, categoryNatives] of Object.entries(allNatives)) {
			for (const [hash, _] of Object.entries(categoryNatives)) {
				routes.push(
					<Route key={hash} path={"/docs/natives/" + categoryName.toLowerCase() + "/" + hash} element={<DocPage native={hash} />} />
				);
			}
		}

		return routes;
	}, []);

	return (
		<AppShell h="100%" navbar={{ width: "22rem", breakpoint: "sm" }}>
			<AppShell.Navbar>
				<NavBar />
			</AppShell.Navbar>

			<AppShell.Main h="100%">
				<Routes>
					<Route path="/" element={<Home />} />
					{docRoutes}
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

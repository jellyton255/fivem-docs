import { AppShell, rem } from "@mantine/core";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import { memo, useEffect, useMemo } from "react";

import NavBar from "./components/NavBar/NavBar";
import { useNativesStore } from "./stores/NativesStore";

import natives from "./natives.json";
import natives_cfx from "./natives_cfx.json";
import { Natives } from "./types/Natives";
import DocPage from "./components/DocPage/DocPage";

export default function App() {
	const location = useLocation();

	useNativesStore.getState().addNatives(natives as Record<string, Record<string, Natives>>);

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

		for (const [categoryName, categoryNatives] of Object.entries(natives)) {
			for (const [hash, _] of Object.entries(categoryNatives)) {
				routes.push(
					<Route key={hash} path={"/docs/natives/" + categoryName.toLowerCase() + "/" + hash} element={<DocPage native={hash} />} />
				);
			}
		}

		return routes;
	}, []);

	return (
		<AppShell
			h="100%"
			navbar={{ width: "18rem", breakpoint: "sm" }}
			style={{
				"::WebkitScrollbar": {
					display: "none",
				},
			}}>
			<AppShell.Navbar>
				<NavBar />
			</AppShell.Navbar>

			<AppShell.Main h="100%" pb={(location.pathname != "/" && 40) || 0}>
				<Routes>
					<Route path="/" element={<Home />} />
					{docRoutes}
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

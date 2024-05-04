import { AppShell, Center, Loader } from "@mantine/core";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import { useEffect, useMemo } from "react";
import NavBar from "./components/NavBar/NavBar";
import { useNativesStore } from "./stores/NativesStore";
import DocPage from "./components/DocPage/DocPage";

export default function App() {
	const location = useLocation();
	const { setNatives, Natives, getAllCategories } = useNativesStore();

	async function getNatives() {
		const nativesRes = await fetch("https://runtime.fivem.net/doc/natives.json");

		if (!nativesRes.ok) {
			throw new Error("Failed to fetch natives.");
		}

		const natives = await nativesRes.json();

		const cfxNativesRes = await fetch("https://runtime.fivem.net/doc/natives_cfx.json");

		if (!cfxNativesRes.ok) {
			throw new Error("Failed to fetch cfx natives.");
		}

		const cfxNatives = await cfxNativesRes.json();

		setNatives({ ...cfxNatives, ...natives });
	}

	useEffect(() => {
		if (getAllCategories()?.length > 0) return;
		getNatives();
	}, []);

	useEffect(() => {
		if (location.hash) {
			const element = document.getElementById(location.hash.slice(1));
			if (element) {
				element.scrollIntoView();
			}
		}
	}, [location]);

	if (getAllCategories()?.length <= 0)
		return (
			<Center h="100vh">
				<Loader />
			</Center>
		);

	return (
		<AppShell h="100vh" navbar={{ width: "22rem", breakpoint: "sm" }}>
			<AppShell.Navbar>
				<NavBar />
			</AppShell.Navbar>

			<AppShell.Main h="100%">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path={`/docs/natives/`} element={<DocPage />} />
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

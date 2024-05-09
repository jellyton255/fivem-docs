"use client";
import { Center, Loader, AppShell } from "@mantine/core";
import { useEffect } from "react";
import NavBar from "./_components/NavBar/NavBar";
import { useNativesStore } from "./_stores/NativesStore";
import { getNatives } from "./_data/natives";

export default function Shell({ children }: { children: React.ReactNode }) {
	const { setNatives, getAllCategories } = useNativesStore();

	useEffect(() => {
		if (getAllCategories()?.length > 0) return;

		const fetchData = async () => {
			setNatives(await getNatives());
		};

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);
	}, []);

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
			<AppShell.Main h="100%">{children}</AppShell.Main>
		</AppShell>
	);
}

"use client";
import { Text, Center, Loader, AppShell, rem, Group } from "@mantine/core";
import { useEffect } from "react";
import NavBar from "./_components/NavBar/NavBar";
import { useNativesStore } from "./_stores/NativesStore";
import Footer from "./_components/Footer/Footer";
import { useHeadroom } from "@mantine/hooks";
import getBaseURL from "./_utils/getBaseURL";

const baseURL = getBaseURL();

export default function Shell({ children }: { children: React.ReactNode }) {
	const { setNatives, getAllCategories } = useNativesStore();
	const pinned = useHeadroom({ fixedAt: 60 });

	useEffect(() => {
		if (getAllCategories()?.length > 0) return;

		const fetchData = async () => {
			setNatives(await fetch(baseURL + "/api/natives").then((res) => res.json()));
		};

		fetchData().catch(console.error);
	}, []);

	if (getAllCategories()?.length <= 0)
		return (
			<Center h="100vh">
				<Loader />
			</Center>
		);

	return (
		<AppShell navbar={{ width: 350, breakpoint: "sm" }} header={{ height: 60, collapsed: !pinned, offset: true }}>
			<AppShell.Header>
				<Group h="100%" align="center" px={20} py={6}>
					<Text fz={30} fw={700} c="white">
						Native Documentation
					</Text>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar>
				<NavBar />
			</AppShell.Navbar>

			<AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`} /*pb={`calc(${rem(220)} + var(--mantine-spacing-md))`}*/>{children}</AppShell.Main>
		</AppShell>
	);
}

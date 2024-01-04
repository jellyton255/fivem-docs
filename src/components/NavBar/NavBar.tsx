import { TextInput, Code, Text, rem, NavLink, AppShell, ScrollArea } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { CSSProperties, useMemo, useState } from "react";
import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "../../utils/stringUtils";
import { useNativesStore } from "../../stores/NativesStore";
import { NavLink as RouteLink } from "react-router-dom";
import { useLocation } from "react-router";
import CategoryNavLink from "./CategoryNavLink";

export default function Navbar() {
	const { nativesByCategory } = useNativesStore();
	const [openedCategory, setOpenedCategory] = useState<string | null>();
	const [searchTerm, setSearchTerm] = useState("");
	const location = useLocation();

	const data = useMemo(() => Object.entries(nativesByCategory), [nativesByCategory]);

	const navRoutes = useMemo(() => {
		return data.map(([categoryName, categoryNatives]) => {
			const isOpened = openedCategory == categoryName;

			// Filter the natives in each category based on the search term
			const filteredNatives = searchTerm
				? Object.entries(categoryNatives).filter(
						([_, nativeData]) =>
							nativeData.name && camelCaseFromSnakeCase(nativeData.name).toLowerCase().includes(searchTerm.toLowerCase())
				  )
				: Object.entries(categoryNatives);

			// Only render the category if it has filtered natives
			if (searchTerm && filteredNatives.length === 0) {
				return []; // Return empty array to exclude this category
			}

			return (
				<CategoryNavLink
					key={categoryName}
					categoryName={categoryName}
					categoryNatives={categoryNatives}
					isOpened={isOpened}
					searchTerm={searchTerm}
					location={location}
					setOpenedCategory={handleSetOpenedCategory}
				/>
			);
		});
	}, [data, openedCategory, searchTerm, location.pathname]);

	return (
		<>
			<AppShell.Section w="90%" mx="auto" mt={16}>
				<TextInput
					placeholder="Search"
					size="xs"
					leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
					rightSectionWidth={100}
					rightSection={<Code>Ctrl + Space</Code>}
					styles={{ section: { pointerEvents: "none" } }}
					mb="sm"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.currentTarget.value)}
				/>
			</AppShell.Section>
			<AppShell.Section w="90%" mx="auto">
				<Text size="xs" fw={500} c="dimmed">
					Developer Reference
				</Text>
			</AppShell.Section>
			<AppShell.Section grow w="95%" mx="auto" component={ScrollArea} scrollbarSize={2}>
				{navRoutes}
			</AppShell.Section>
		</>
	);
}

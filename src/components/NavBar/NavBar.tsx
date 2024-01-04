import { TextInput, Code, Text, rem, AppShell, ScrollArea } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useNativesStore } from "../../stores/NativesStore";
import { useLocation } from "react-router";
import CategoryNavLink from "./CategoryNavLink";

export default function Navbar() {
	const { nativesByCategory } = useNativesStore();
	const [openedCategories, setOpenedCategories] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const location = useLocation();

	const data = useMemo(() => Object.entries(nativesByCategory), [nativesByCategory]);

	const navRoutes = useMemo(() => {
		return data.map(([categoryName, categoryNatives]) => {
			const isOpened = openedCategories.includes(categoryName);

			const handleSetOpenedCategory = (categoryName: string) => {
				if (openedCategories.includes(categoryName)) {
					// If the category is already opened, remove it from the list
					setOpenedCategories(openedCategories.filter((cat) => cat !== categoryName));
				} else {
					// Otherwise, add it to the list
					setOpenedCategories([...openedCategories, categoryName]);
				}
			};

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
	}, [data, openedCategories, searchTerm, location.pathname]);

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
			<AppShell.Section grow w="95%" mx="auto" component={ScrollArea} scrollbarSize={6}>
				{navRoutes}
			</AppShell.Section>
		</>
	);
}

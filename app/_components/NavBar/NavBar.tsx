import { TextInput, Code, Text, AppShell, ScrollArea } from "@mantine/core";
import { useMemo, useState } from "react";
import CategoryNavLink from "./CategoryNavLink";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNativesStore } from "@/app/_stores/NativesStore";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const { Natives } = useNativesStore();
	const [openedCategories, setOpenedCategories] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const pathname = usePathname();

	const data = useMemo(() => Object.entries(Natives), [Natives]);

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

			return <CategoryNavLink key={categoryName} categoryName={categoryName} categoryNatives={categoryNatives} isOpened={isOpened} searchTerm={searchTerm} setOpenedCategory={handleSetOpenedCategory} />;
		});
	}, [data, openedCategories, searchTerm, pathname]);

	return (
		<>
			<AppShell.Section w="90%" mx="auto" mt={16}>
				<TextInput
					placeholder="Search"
					size="xs"
					leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />}
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

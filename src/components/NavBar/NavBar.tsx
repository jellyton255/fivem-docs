import { TextInput, Code, Text, rem, NavLink, AppShell, ScrollArea } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { CSSProperties, useMemo, useState } from "react";
import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "../../utils/stringUtils";
import { useNativesStore } from "../../stores/NativesStore";
import { NavLink as RouteLink } from "react-router-dom";
import { useLocation } from "react-router";

const categoryStyle: CSSProperties = {
	borderRadius: rem(6),
	padding: `${rem(6)} ${rem(12)}`,
	transition: "all 0.3s ease", // Customize as needed
};

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
						([_, nativeData]) => nativeData.name && nativeData.name.toLowerCase().includes(searchTerm.toLowerCase())
				  )
				: Object.entries(categoryNatives);

			// Only render the category if it has filtered natives
			if (searchTerm && filteredNatives.length === 0) {
				return []; // Return empty array to exclude this category
			}

			return (
				<NavLink
					label={capitalizeFirstLetter(categoryName)}
					opened={isOpened}
					onChange={(opened) => setOpenedCategory(opened ? categoryName : null)}
					style={categoryStyle}>
					<></>
					{isOpened &&
						filteredNatives.map(([nativeHash, nativeData]) => {
							return (
								<NavLink
									h={30}
									style={categoryStyle}
									component={RouteLink}
									to={"/docs/natives/" + categoryName.toLowerCase() + "/" + nativeHash}
									active={location.pathname == "/docs/natives/" + categoryName.toLowerCase() + "/" + nativeHash}
									label={<Text fz={13}>{(nativeData.name && camelCaseFromSnakeCase(nativeData?.name)) || nativeHash}</Text>}
								/>
							);
						})}
				</NavLink>
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

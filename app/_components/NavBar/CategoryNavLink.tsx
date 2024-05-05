import { NavLink, CSSProperties, rem, Title } from "@mantine/core";
import { useMemo } from "react";
import NativeNavLink from "./NativeNavLink";
import { Virtuoso } from "react-virtuoso";
import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "@/app/_utils/stringUtils";

const categoryStyle: CSSProperties = {
	borderRadius: rem(6),
	padding: `${rem(6)} ${rem(12)}`,
	transition: "all 0.3s ease", // Customize as needed
};

type CategoryNavLinkProps = {
	categoryName: string;
	categoryNatives: Record<string, any>;
	isOpened: boolean;
	searchTerm: string;
	setOpenedCategory: (categoryName: string) => void; // Updated type
};

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

function CategoryNavLink({ categoryName, categoryNatives, isOpened, setOpenedCategory, searchTerm }: CategoryNavLinkProps) {
	isOpened = isOpened || searchTerm?.length > 1;

	const filteredNatives = useMemo(
		() => (searchTerm ? Object.entries(categoryNatives).filter(([_, nativeData]) => nativeData.name && camelCaseFromSnakeCase(nativeData.name).toLowerCase().includes(searchTerm.toLowerCase())) : Object.entries(categoryNatives)),
		[searchTerm]
	);

	// Only render the category if all natives are filtered out
	if (searchTerm && filteredNatives.length === 0) {
		return [];
	}

	const listHeight = rem(clamp(filteredNatives.length, filteredNatives.length, 20) * 31);

	return (
		<NavLink key={categoryName} label={<Title order={5}>{capitalizeFirstLetter(categoryName)}</Title>} opened={isOpened} onChange={() => setOpenedCategory(categoryName)} style={categoryStyle}>
			{(isOpened && (
				<>
					<Virtuoso
						style={{ width: "95%", height: listHeight }}
						data={filteredNatives}
						itemContent={(index, [nativeHash, nativeData]) => <NativeNavLink key={nativeHash} nativeHash={nativeData.jhash || nativeHash} nativeData={nativeData} />}
					/>
				</>
			)) || <></>}
		</NavLink>
	);
}

export default CategoryNavLink;

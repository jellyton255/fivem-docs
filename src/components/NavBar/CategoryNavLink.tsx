import { NavLink, CSSProperties, rem, Loader, Title } from "@mantine/core";
import { Location } from "react-router-dom";
import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "../../utils/stringUtils";
import { Suspense, useEffect, useMemo, useState } from "react";
import NativeNavLink from "./NativeNavLink";
import { Virtuoso } from "react-virtuoso";

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
	location: Location;
	setOpenedCategory: (categoryName: string) => void; // Updated type
};

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

function CategoryNavLink({ categoryName, categoryNatives, isOpened, setOpenedCategory, searchTerm, location }: CategoryNavLinkProps) {
	isOpened = isOpened || searchTerm?.length > 1;

	// Filter the natives in each category based on the search term
	const filteredNatives = useMemo(
		() =>
			searchTerm
				? Object.entries(categoryNatives).filter(([_, nativeData]) => nativeData.name && camelCaseFromSnakeCase(nativeData.name).toLowerCase().includes(searchTerm.toLowerCase()))
				: Object.entries(categoryNatives),
		[searchTerm]
	);

	const formattedCategoryName = useMemo(() => categoryName.toLowerCase(), []);

	// Only render the category if it has filtered natives
	if (searchTerm && filteredNatives.length === 0) {
		return []; // Return empty array to exclude this category
	}

	const listHeight = rem(clamp(filteredNatives.length, filteredNatives.length, 20) * 30);

	return (
		<NavLink key={categoryName} label={<Title order={5}>{capitalizeFirstLetter(categoryName)}</Title>} opened={isOpened} onChange={() => setOpenedCategory(categoryName)} style={categoryStyle}>
			{(isOpened && (
				<>
					<Virtuoso
						style={{ width: "95%", height: listHeight }}
						data={filteredNatives}
						itemContent={(index, [nativeHash, nativeData]) => (
							<NativeNavLink key={nativeHash} nativeHash={nativeHash} nativeData={nativeData} formattedCategoryName={formattedCategoryName} location={location} />
						)}
					/>
				</>
			)) || <></>}
		</NavLink>
	);
}

export default CategoryNavLink;

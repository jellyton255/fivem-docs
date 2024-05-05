import { camelCaseFromSnakeCase } from "@/app/_utils/stringUtils";
import { Text, NavLink, CSSProperties, rem } from "@mantine/core";
import { memo } from "react";
import NextLink from "next/link";

const categoryStyle: CSSProperties = {
	borderRadius: rem(6),
	padding: `${rem(6)} ${rem(12)}`,
	transition: "all 0.3s ease", // Customize as needed
};

function NativeNavLink({ nativeHash, nativeData, formattedCategoryName, location }: { nativeHash: string; nativeData: any; formattedCategoryName: string; location: Location }) {
	return (
		<NavLink
			h={31}
			key={nativeHash}
			style={categoryStyle}
			component={NextLink}
			href={"/docs/natives/?_" + nativeHash}
			active={location.pathname == "/docs/natives/" + formattedCategoryName + "/" + nativeHash}
			label={
				<Text fz={14} fw={500}>
					{(nativeData.name && camelCaseFromSnakeCase(nativeData?.name)) || nativeHash}
				</Text>
			}
		/>
	);
}

export default memo(NativeNavLink);

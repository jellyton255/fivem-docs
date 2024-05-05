import { Card, Text, Flex, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

type CalloutTypes = {
	children: ReactNode;
	type?: "success" | "warning" | "error";
	emoji?: string;
};

const typeColorMapping = {
	success: "green",
	warning: "yellow",
	error: "red",
	general: "electric",
};

export default function Callout(props: CalloutTypes) {
	const theme = useMantineTheme();
	const color = theme.variantColorResolver({ color: typeColorMapping[props.type || "general"] || "electric", theme: useMantineTheme(), variant: "light" });

	return (
		<Card radius="md" bg={color.background} shadow="md">
			<Flex gap="md" justify="center" align="center">
				{props.emoji && <Text fz="lg">{props.emoji}</Text>}
				{props.children}
			</Flex>
		</Card>
	);
}

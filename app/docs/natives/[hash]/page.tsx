"use client";
import { Flex, Title, Text, Stack, Group, Center, Loader } from "@mantine/core";
import { Suspense } from "react";
import { CodeHighlight } from "@mantine/code-highlight";
import Callout from "@/app/_components/Callout";
import RealmIndicator from "@/app/_components/RealmIndicator";
import { camelCaseFromSnakeCase, getParamaterString } from "@/app/_utils/stringUtils";
import { useNativesStore } from "@/app/_stores/NativesStore";
import { DescriptionSection, ArgsSection, ExamplesSection } from "./_components/Sections";
import "@mantine/code-highlight/styles.css";
import type { Metadata } from "next";

export interface ParamProps {
	name: string;
	type: string;
	description?: string;
}

export default function Page({ params }: { params: { hash: string } }) {
	const { NativesByHash, NativesByJHash } = useNativesStore();

	const hash = params?.hash?.substring(1);

	if (!hash)
		return (
			<Center h="100vh">
				<Callout type="error" emoji="❌">
					<Text fz={22} fw={700} c="white">
						{"Something has gone very wrong!"}
					</Text>
				</Callout>
			</Center>
		);

	const nativeData = NativesByJHash[hash] || NativesByHash[hash];

	if (!nativeData)
		return (
			<Center h="100vh">
				<Callout type="error" emoji="❌">
					<Text fz={22} fw={700} c="white">
						{"The native you're looking for doesn't exist!"}
					</Text>
				</Callout>
			</Center>
		);

	const nativeName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || nativeData.hash;
	const returnString = (nativeData.results && nativeData.results != "void" && nativeData.results) || "";

	return (
		<Flex direction="column" gap="md" mx={200} py={20} maw="100%">
			<Suspense fallback={<Loader />}>
				<Stack gap={4}>
					<Group gap={10}>
						<RealmIndicator realm={nativeData.apiset || "client"} />
						<Title order={2}>{nativeName}</Title>
					</Group>
					<Text fz={14} c="dimmed">
						{nativeData.hash}
					</Text>
				</Stack>

				<CodeHighlight
					code={`${returnString} ${nativeName}(${getParamaterString(nativeData.params)})`}
					style={{
						whiteSpace: "pre-wrap",
					}}
					withCopyButton={false}
				/>
				<DescriptionSection description={nativeData.description} />
				<ArgsSection params={nativeData.params} />
				<ExamplesSection examples={nativeData.examples} />
			</Suspense>
		</Flex>
	);
}

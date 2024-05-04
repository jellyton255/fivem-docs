import { Flex, Title, Text, Stack, Divider, List, Badge, Code, Card, useMantineTheme, rem, Group, Tooltip, Center, Loader, Table, Anchor } from "@mantine/core";
import { memo, useMemo, Suspense } from "react";
import { useNativesStore } from "../../stores/NativesStore";
import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";
import { camelCaseFromSnakeCase } from "../../utils/stringUtils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RealmIndicator from "../RealmIndicator";
import { Natives } from "../../types/Natives";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Callout from "../Callout";

interface ParamProps {
	name: string;
	type: string;
	description?: string;
}

function getParamaterString(params: ParamProps[]) {
	var paramsString = (params.length > 0 && " ") || "";
	params.map((paramData, index) => {
		paramsString += `${paramData.name}: ${paramData.type}`;
		if (index != params.length - 1) paramsString += ", ";
	});
	paramsString += (params.length > 0 && " ") || "";
	return paramsString;
}

function replaceHashWithQuestionMark(inputString: string) {
	return inputString.replace(/#/g, "?");
}

function containsNewline(inputString: string) {
	return inputString.includes("\n");
}

function DescriptionSection(props: { description: string }) {
	const { description } = props;
	const theme = useMantineTheme();

	if (!description || description == "") {
		const parsedColor = theme.variantColorResolver({
			color: "yellow.5",
			variant: "light",
			theme: theme,
		});

		return (
			<>
				<Divider my={10} />
				<Card bg={parsedColor.background}>
					<Flex align="center" gap={16}>
						<FontAwesomeIcon
							style={{
								color: parsedColor.color,
								width: rem(50),
								height: rem(50),
							}}
							icon={faTriangleExclamation}
						/>
						<Text fz={22} fw={700} c="white">
							This page lacks a native description! If you have any information on this native, consider contributing!
						</Text>
					</Flex>
				</Card>
			</>
		);
	}

	return (
		<>
			<Divider my={10} />
			<Stack gap={0}>
				<Title order={1} mb={2}>
					Description
				</Title>
				<Markdown
					remarkPlugins={[[remarkGfm]]}
					components={{
						p(props) {
							const { children } = props;
							return (
								<Text
									style={{
										whiteSpace: "pre-wrap",
									}}>
									{children}
								</Text>
							);
						},
						table(props) {
							const { children } = props;
							return (
								<Card m={12} pt={12} bg="#1b1b1b">
									<Table>{children}</Table>
								</Card>
							);
						},
						th(props) {
							const { children } = props;
							return (
								<Table.Th fz={16} px={0}>
									{children}
								</Table.Th>
							);
						},
						code(props) {
							console.log(props);
							const { children, className } = props;
							return className || (containsNewline(children as string) && <CodeHighlight w="fit-content" maw="100%" code={children as string} style={{ whiteSpace: "pre-wrap" }} withCopyButton={false} />) || <Code>{children}</Code>;
						},
						a(props) {
							const { children, href } = props;

							return (
								<Anchor to={(href && replaceHashWithQuestionMark(href)) || ""} fz={16} style={{ whiteSpace: "pre-wrap" }} component={Link}>
									{children}
								</Anchor>
							);
						},
					}}>
					{description}
				</Markdown>
			</Stack>
		</>
	);
}

function ArgsSection(props: { params: ParamProps[] }) {
	const { params } = props;

	if (!params || params.length == 0) return <></>;

	const listItems = params.map((paramData, index) => {
		return (
			<List.Item
				key={paramData.name + paramData.type}
				icon={
					<Badge color="orange.5" variant="light" size="lg" radius="md">
						{index + 1}
					</Badge>
				}>
				<Code fz={16}>
					{paramData.name}: {paramData.type}
				</Code>
				{paramData.description && (
					<Text fz={15} c="dimmed">
						<Markdown
							components={{
								p(props) {
									const { node, children, ...rest } = props;
									return <Text>{children}</Text>;
								},
								code(props) {
									const { children } = props;
									return (
										<Code
											style={{
												whiteSpace: "pre-wrap",
											}}>
											{children}
										</Code>
									);
								},
							}}>
							{paramData.description}
						</Markdown>
					</Text>
				)}
			</List.Item>
		);
	});

	return (
		<>
			<Divider my={10} />
			<Stack gap={0}>
				<Title order={1} mb={20}>
					Arguments
				</Title>
				<List spacing="xs" size="sm" center>
					{listItems}
				</List>
			</Stack>
		</>
	);
}

function ExamplesSection(props: { examples: { lang: string; code: string }[] }) {
	const { examples } = props;

	if (!examples || examples.length == 0) return <></>;

	const exampleBlocks = examples.map((example) => {
		return { code: example.code, language: example.lang, fileName: example.lang };
	});

	return (
		<>
			<Divider my={10} />
			<Stack gap={0}>
				<Title order={1} mb={20}>
					Examples
				</Title>
				<CodeHighlightTabs w="fit-content" code={exampleBlocks} />
			</Stack>
		</>
	);
}

function DocPage() {
	const location = useLocation();
	const { NativesByHash, NativesByJHash } = useNativesStore();
	const hash = location.search.substring(2);
	const nativeData = NativesByJHash[hash] || NativesByHash[hash];

	if (!nativeData)
		return (
			<Center h="90vh">
				<Callout type="error" emoji="❌">
					<Text fz={22} fw={700} c="white">
						The native you're looking for doesn't exist!
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
				<CodeHighlight code={`${returnString} ${nativeName}(${getParamaterString(nativeData.params)})`} language="lua" copyLabel="Copy button code" copiedLabel="Copied!" />
				<DescriptionSection description={nativeData.description} />
				<ArgsSection params={nativeData.params} />
				<ExamplesSection examples={nativeData.examples} />
			</Suspense>
		</Flex>
	);
}

export default memo(DocPage);

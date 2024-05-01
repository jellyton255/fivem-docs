import { Flex, Title, Text, Stack, Divider, List, Badge, Code, Card, useMantineTheme, rem, Group, Tooltip, Center, Loader } from "@mantine/core";
import { memo, useMemo, Suspense } from "react";
import { useNativesStore } from "../../stores/NativesStore";
import { CodeHighlight } from "@mantine/code-highlight";
import { camelCaseFromSnakeCase } from "../../utils/stringUtils";
import Markdown from "react-markdown";
import { faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RealmIndicator from "../RealmIndicator";

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
						code(props) {
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
					}}>
					{description}
				</Markdown>
			</Stack>
		</>
	);
}

function ParamSection(props: { params: ParamProps[] }) {
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
				<Code fz={16} c="dimmed">
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
										<Text
											style={{
												whiteSpace: "pre-wrap",
											}}>
											{children}
										</Text>
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
		return <CodeHighlight key={example.code} code={`${example.code}`} language="lua" />;
	});

	return (
		<>
			<Divider my={10} />
			<Stack gap={0}>
				<Title order={1} mb={20}>
					Examples
				</Title>
				{exampleBlocks}
			</Stack>
		</>
	);
}

function DocPage(props: { native: string }) {
	const { native } = props;
	const { Natives, getNativeByHash } = useNativesStore();

	const nativeData = useMemo(() => getNativeByHash(native), [props.native, Natives]);

	if (!nativeData)
		return (
			<Center h="90vh">
				<Loader />
			</Center>
		);

	const nativeName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || nativeData.hash;
	const returnString = (nativeData.results && nativeData.results != "void" && nativeData.results) || "";

	return (
		<Flex direction="column" gap="md" mx={200} my={20}>
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
				<ParamSection params={nativeData.params} />
				<ExamplesSection examples={nativeData.examples} />
			</Suspense>
		</Flex>
	);
}

export default memo(DocPage);

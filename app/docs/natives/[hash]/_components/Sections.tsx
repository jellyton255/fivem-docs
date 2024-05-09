import { containsNewline, replaceHashWithQuestionMark } from "@/app/_utils/stringUtils";
import { faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";
import { Text, useMantineTheme, Divider, Card, Flex, rem, Stack, Title, Table, Code, Anchor, List, Badge } from "@mantine/core";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ParamProps } from "../page";
import NextLink from "next/link";

export function DescriptionSection(props: { description: string }) {
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
							const { children, className } = props;
							const isMultiline = className || containsNewline(children as string);

							return (isMultiline && <CodeHighlight w="100%" code={children as string} style={{ whiteSpace: "pre-wrap" }} withCopyButton={false} />) || <Code>{children}</Code>;
						},
						a(props) {
							const { children, href } = props;

							return (
								<Anchor href={(href && "/docs/natives/" + replaceHashWithQuestionMark(href)) || ""} fz={16} style={{ whiteSpace: "pre-wrap" }} component={NextLink}>
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

export function ArgsSection(props: { params: ParamProps[] }) {
	const { params } = props;

	if (!params || params.length == 0) return <></>;

	const listItems = params.map((paramData, index) => {
		return (
			<List.Item
				key={paramData.name + paramData.type}
				icon={
					<Badge variant="light" size="lg" radius="md">
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

export function ExamplesSection(props: { examples: { lang: string; code: string }[] }) {
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

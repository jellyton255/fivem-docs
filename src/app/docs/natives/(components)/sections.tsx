import { containsNewline, replaceParamType } from "@/utils/stringUtils";
import { faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Highlight from "@/components/code";
import { ParamProps } from "../page";

export async function DescriptionSection({ description }: { description: string }) {
  if (!description || description == "")
    return (
      <>
        <Separator className="my-2" />
        <div className="flex items-center justify-center gap-4 rounded-sm bg-yellow-500/10 p-6">
          <FontAwesomeIcon size="2xl" className="text-yellow-500" icon={faTriangleExclamation} />
          <div className="scroll-m-20 text-2xl font-bold leading-none tracking-tight text-neutral-100">
            This page lacks a native description! If you have any information on this native, consider contributing!
          </div>
        </div>
      </>
    );

  return (
    <>
      <Separator className="my-2" />
      <div>
        <h2 className="mb-2 scroll-m-20 text-3xl font-bold tracking-tight">Description</h2>
        <Markdown
          remarkPlugins={[[remarkGfm]]}
          components={{
            code(props) {
              const { children, className } = props;
              const isMultiline = className || containsNewline(children as string);

              if (isMultiline) return <Highlight code={children as string} />;

              return <code>{children}</code>;
            },
            a(props) {
              const { children, href } = props;

              return (
                <Link
                  className="font-semibold underline"
                  href={(href && "/docs/natives?hash=" + href.substring(2)) || ""}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {children}
                </Link>
              );
            },
          }}
        >
          {description}
        </Markdown>
      </div>
    </>
  );
}

export function ArgsSection({ params }: { params: ParamProps[] }) {
  if (!params || params.length == 0) return null;

  const listItems = params.map((paramData, index) => {
    return (
      <div className="flex items-center gap-3" key={paramData.name + paramData.type}>
        <Badge variant="outline" className="border-2 text-lg font-bold">
          {index + 1}
        </Badge>

        <div key={paramData.name + paramData.type}>
          <code>
            {paramData.name}: {replaceParamType(paramData.type)}
          </code>
          {paramData.description && <Markdown>{paramData.description}</Markdown>}
        </div>
      </div>
    );
  });

  return (
    <>
      <Separator className="my-2" />
      <div className="flex flex-col">
        <h2 className="mb-2 scroll-m-20 text-3xl font-bold tracking-tight">Arguments</h2>
        <div className="flex flex-col gap-2">{listItems}</div>
      </div>
    </>
  );
}

export function ExamplesSection({ examples }: { examples: { lang: string; code: string }[] }) {
  if (!examples || examples.length == 0) return null;

  const exampleBlocks = examples.map((example) => ({ code: example.code, language: example.lang }));

  return (
    <>
      <Separator className="my-2" />
      <h2 className="mb-2 scroll-m-20 text-3xl font-bold tracking-tight">Examples</h2>
      <Tabs defaultValue={exampleBlocks[0].language} className="w-full">
        <TabsList>
          {exampleBlocks.map((example) => (
            <TabsTrigger key={example.language} value={example.language}>
              {example.language}
            </TabsTrigger>
          ))}
        </TabsList>
        {exampleBlocks.map((example) => (
          <TabsContent key={example.language} value={example.language}>
            <Highlight code={example.code} language={example.language} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

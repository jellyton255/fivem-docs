import RealmIndicator from "@/app/_components/RealmIndicator";
import { camelCaseFromSnakeCase, getParamaterString, replaceParamType } from "@/app/_utils/stringUtils";
import { DescriptionSection, ArgsSection, ExamplesSection } from "./_components/Sections";
import { getNativesByHash, getNativesByJHash } from "@/app/_utils/getNatives";
import Highlight from "@/app/_components/Code";

export interface ParamProps {
  name: string;
  type: string;
  description?: string;
}

export default async function Page({ params }: { params: { hash: string } }) {
  const hash = params?.hash?.substring(1);

  if (!hash) return <div className="flex size-full items-center justify-center text-2xl font-bold">{"Something has gone very wrong!"}</div>;

  const [nativesByHash, nativesByJHash] = await Promise.all([getNativesByHash(), getNativesByJHash()]);

  const nativeData = nativesByHash[hash] || nativesByJHash[hash];

  if (!nativeData)
    return (
      <div className="flex size-full items-center justify-center text-2xl font-bold">{"The native you're looking for doesn't exist!"}</div>
    );

  const nativeName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || nativeData.hash;
  const returnString = (nativeData.results && nativeData.results != "void" && replaceParamType(nativeData.results)) || "";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <RealmIndicator realm={nativeData.apiset || "client"} />
          <h1 className="scroll-m-20 text-3xl font-extrabold leading-[0] lg:text-4xl">{nativeName}</h1>
        </div>
        <div className="text-sm font-medium text-neutral-400">{nativeData.hash}</div>
      </div>

      <div className="prose prose-neutral prose-invert flex max-w-full flex-col prose-h2:mt-0 prose-p:my-0.5 prose-code:rounded-sm prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-1 prose-code:font-mono prose-code:text-neutral-100 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:my-0 prose-ul:my-0 prose-table:my-2">
        <Highlight code={`${returnString} ${nativeName}(${getParamaterString(nativeData.params)})`} />
        <DescriptionSection description={nativeData.description} />
        <ArgsSection params={nativeData.params} />
        <ExamplesSection examples={nativeData.examples} />
      </div>
    </div>
  );
}

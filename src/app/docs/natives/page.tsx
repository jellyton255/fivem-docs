import RealmIndicator from "@/components/realm-indicator";
import { camelCaseFromSnakeCase, capitalizeFirstLetter, getParamaterString, replaceParamType } from "@/utils/stringUtils";
import { getNativesByHash, getNativesByJHash } from "@/utils/getNatives";
import Highlight from "@/components/code";
import getBaseURL from "@/utils/getBaseURL";
import { Metadata } from "next";
import { DescriptionSection, ArgsSection, ExamplesSection } from "./(components)/sections";

interface URLParams {
  title: string;
  realm: string;
  description: string;
  namespace: string;
}

/**
 * Encodes a parameter object into a URL query string.
 */
function encodeQueryParams(params: URLParams): string {
  return (Object.keys(params) as Array<keyof URLParams>)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");
}

/**
 * Generates a URL for the API with specified parameters.
 */
function generateApiUrl(baseURL: string, params: URLParams): string {
  const queryString = encodeQueryParams(params);
  return `${baseURL}?${queryString}`;
}

const baseURL = getBaseURL();

export async function generateMetadata(props: { searchParams: Promise<{ [key: string]: string | undefined }> }): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const [nativesByHash, nativesByJHash] = await Promise.all([getNativesByHash(), getNativesByJHash()]);

  const hash = searchParams?.hash;

  if (!hash)
    return {
      title: "Natives",
      description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      openGraph: {
        title: "Natives",
      },
    };

  const nativeData = nativesByHash[hash] || nativesByJHash[hash];

  if (!nativeData)
    return {
      title: "Natives",
      description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      openGraph: {
        title: "Natives",
      },
    };

  const nativeName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || nativeData.hash;

  const URLParams: URLParams = {
    title: nativeName,
    realm: capitalizeFirstLetter(nativeData.apiset || "Client"),
    description:
      nativeData?.description?.slice(0, 500) + ((nativeData?.description.length > 500 && "...") || "") ||
      "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
    namespace: nativeData.ns,
  };

  const url = generateApiUrl(baseURL + "/api/og", URLParams);

  return {
    title: nativeName,
    openGraph: {
      title: nativeName,
      images: [
        {
          url: url,
          width: 1200,
          height: 600,
          alt: nativeName,
        },
      ],
    },
  };
}

export type ParamProps = {
  name: string;
  type: string;
  description?: string;
};

function WelcomeCard() {
  return (
    <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-900 p-4 md:max-w-4xl">
      <h1 className="scroll-m-20 text-3xl font-extrabold lg:text-5xl">Native Documentation</h1>
      <p className="text-neutral-300">
        Utilize the navbar on the left to navigate to the documentation for a specific native. If you're looking for a specific native, you
        can search for it by name. If you're not sure what you're looking for, you can browse by namespace by opening up a section and
        scrolling through.
      </p>
      <p className="text-right text-neutral-500">This site is not affiliated with Cfx.re or Rockstar Games.</p>
    </div>
  );
}

export default async function Page(props: { searchParams: Promise<{ hash: string }> }) {
  const searchParams = await props.searchParams;
  const hash = searchParams?.hash;

  if (!hash)
    return (
      <div className="flex w-full items-center justify-center">
        <WelcomeCard />
      </div>
    );

  const [nativesByHash, nativesByJHash] = await Promise.all([getNativesByHash(), getNativesByJHash()]);

  const nativeData = nativesByHash[hash] || nativesByJHash[hash];

  if (!nativeData)
    return (
      <div className="flex size-full items-center justify-center text-2xl font-bold">{"The native you're looking for doesn't exist!"}</div>
    );

  const nativeName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || nativeData.hash;
  const returnString = (nativeData.results && nativeData.results != "void" && replaceParamType(nativeData.results)) || "";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4 md:min-w-[70rem]">
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

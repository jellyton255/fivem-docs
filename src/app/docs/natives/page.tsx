import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "@/utils/stringUtils";
import { getNatives, getNativesByHash } from "@/utils/getNatives";
import getBaseURL from "@/utils/getBaseURL";
import { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import NativePage from "./(components)/native-page";

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

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const nativesByHash = await getNativesByHash();

  const hash = searchParams?.hash;

  if (!hash)
    return {
      title: "Natives",
      description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      openGraph: {
        title: "Natives",
      },
    };

  const nativeData = nativesByHash[hash];

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
    title: { absolute: nativeName },
    description: nativeData.description,
    openGraph: {
      title: { absolute: nativeName },
      description: nativeData.description,
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

export default async function Page() {
  const [natives, nativesByHash] = await Promise.all([getNatives(), getNativesByHash()]);

  return (
    <div className="flex w-full flex-nowrap gap-2">
      <Navbar natives={natives} />
      <NativePage nativesByHash={nativesByHash} />
    </div>
  );
}

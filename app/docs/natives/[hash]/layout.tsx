import { Natives } from "@/app/_types/Natives";
import getBaseURL from "@/app/_utils/getBaseURL";
import { getNatives } from "@/app/_utils/getNatives";
import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "@/app/_utils/stringUtils";
import { Metadata } from "next";

type Props = {
  params: { hash: string };
};

interface URLParams {
  title: string;
  realm: string;
  description: string;
  namespace: string; // Adding the namespace parameter
}

/**
 * Encodes a parameter object into a URL query string.
 */
function encodeQueryParams(params: URLParams): string {
  return Object.keys(params)
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const natives = await getNatives();
  const nativesByHash: Record<string, Natives> = {};
  const nativesByJHash: Record<string, Natives> = {};

  for (const category of Object.keys(natives)) {
    for (const hash in natives[category]) {
      const native = natives[category][hash];
      nativesByHash[hash] = native;
      if (native.jhash) {
        nativesByJHash[native.jhash] = native;
      }
    }
  }

  const hash = params?.hash?.substring(1);

  if (!hash)
    return {
      title: "Native Not Found",
      description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      openGraph: {
        title: "Native Not Found",
      },
    };

  const nativeData = nativesByJHash[hash] || nativesByHash[hash];

  if (!nativeData)
    return {
      title: "Native Not Found",
      description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
      openGraph: {
        title: "Native Not Found",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

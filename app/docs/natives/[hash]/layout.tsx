import { getNatives } from "@/app/_data/natives";
import { useNativesStore } from "@/app/_stores/NativesStore";
import { Natives } from "@/app/_types/Natives";
import { camelCaseFromSnakeCase } from "@/app/_utils/stringUtils";
import { Metadata } from "next";

type Props = {
	params: { hash: string };
};

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
			title: "Native Not Found | FiveM Docs",
			description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
		};

	const nativeData = nativesByJHash[hash] || nativesByHash[hash];

	if (!nativeData)
		return {
			title: "Native Not Found | FiveM Docs",
			description: "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
		};

	const nativeName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || nativeData.hash;

	return {
		title: nativeName + " | FiveM Docs",
		description: nativeData.description || "FiveM documentation for natives. Not affiliated with Cfx.re or Rockstar Games.",
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}

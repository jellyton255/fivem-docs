async function getClientNatives() {
	const nativesRes = await fetch("https://runtime.fivem.net/doc/natives.json");

	if (!nativesRes.ok) {
		throw new Error("Failed to fetch natives.");
	}

	return await nativesRes.json();
}

async function getCfxNatives() {
	const nativesRes = await fetch("https://runtime.fivem.net/doc/natives_cfx.json");

	if (!nativesRes.ok) {
		throw new Error("Failed to fetch cfx natives.");
	}

	return await nativesRes.json();
}

export async function getNatives() {
	const [clientNatives, cfxNatives] = await Promise.all([getClientNatives(), getCfxNatives()]);

	return { ...cfxNatives, ...clientNatives };
}

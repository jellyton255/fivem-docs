var CachedNatives = null;
var TimeCached = 0;

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
	if (!CachedNatives || TimeCached + 1000 * 60 * 24 < Date.now()) {
		console.log("Fetching natives from FiveM API...");
		const [clientNatives, cfxNatives] = await Promise.all([getClientNatives(), getCfxNatives()]);
		CachedNatives = { ...cfxNatives, ...clientNatives };
		TimeCached = Date.now();
	}

	return CachedNatives;
}

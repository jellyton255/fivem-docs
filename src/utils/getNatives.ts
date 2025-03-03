import { Native } from "../types/Natives";

let nativeCache: Record<string, Record<string, Native>> | undefined = undefined;
let nativesByHashCache: Record<string, Native> = {};

export async function getClientNatives(): Promise<Record<string, Record<string, Native>>> {
  const nativesRes = await fetch("https://runtime.fivem.net/doc/natives.json");

  if (!nativesRes.ok) {
    throw new Error("Failed to fetch natives.");
  }

  return await nativesRes.json();
}

export async function getCfxNatives(): Promise<Record<string, Record<string, Native>>> {
  const nativesRes = await fetch("https://runtime.fivem.net/doc/natives_cfx.json");

  if (!nativesRes.ok) {
    throw new Error("Failed to fetch cfx natives.");
  }

  return await nativesRes.json();
}

export async function getNatives() {
  if (nativeCache) return nativeCache;

  const [clientNatives, cfxNatives] = await Promise.all([getClientNatives(), getCfxNatives()]);
  const natives = { ...cfxNatives, ...clientNatives };

  nativeCache = natives;

  for (const category of Object.keys(natives)) {
    for (const hash in natives[category]) {
      const native = natives[category][hash];
      nativesByHashCache[hash] = native;
    }
  }

  return natives;
}

export async function getNativesByHash() {
  if (nativeCache) return nativesByHashCache;

  await getNatives();

  return nativesByHashCache;
}

import { Natives } from "../_types/Natives";

let nativeCache: Object | undefined = undefined;
let nativesByHashCache: Record<string, Natives> = {}; // Initialize as an empty object
let nativesByJHashCache: Record<string, Natives> = {}; // Initialize as an empty object

export async function getClientNatives() {
  const nativesRes = await fetch("https://runtime.fivem.net/doc/natives.json", { cache: "no-store" });

  if (!nativesRes.ok) {
    throw new Error("Failed to fetch natives.");
  }

  return await nativesRes.json();
}

export async function getCfxNatives() {
  const nativesRes = await fetch("https://runtime.fivem.net/doc/natives_cfx.json", { cache: "no-store" });

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
      if (native.jhash) {
        nativesByJHashCache[native.jhash] = native;
      }
    }
  }

  return natives;
}

export async function getNativesByHash() {
  if (nativeCache) return nativesByHashCache;

  await getNatives();

  return nativesByHashCache;
}

export async function getNativesByJHash() {
  if (nativeCache) return nativesByJHashCache;

  await getNatives();

  return nativesByJHashCache;
}

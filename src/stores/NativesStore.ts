import { create } from "zustand";
import { Natives } from "../types/Natives";

interface NativesState {
	Natives: Record<string, Record<string, Natives>>;
	NativesByHash: Record<string, Natives>;
	NativesByJHash: Record<string, Natives>;
	setNatives: (natives: Record<string, Record<string, Natives>>) => void;
	getAllCategories: () => string[];
	getNativesByCategory: (category: string) => Record<string, Natives> | undefined;
}

export const useNativesStore = create<NativesState>((set, get) => ({
	Natives: {},
	NativesByHash: {},
	NativesByJHash: {},

	setNatives: (natives) => {
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

		set({ Natives: natives, NativesByHash: nativesByHash, NativesByJHash: nativesByJHash });
	},

	getAllCategories: () => {
		const state = get();
		return Object.keys(state.Natives);
	},

	getNativesByCategory: (category) => {
		const state = get();
		return state.Natives[category];
	},
}));

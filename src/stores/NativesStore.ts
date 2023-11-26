import { create } from "zustand";
import { Natives } from "../types/Natives";

interface NativesState {
	nativesByCategory: Record<string, Record<string, Natives>>;
	addNatives: (natives: Record<string, Record<string, Natives>>) => void;
	getAllCategories: () => string[];
	getNativesByCategory: (category: string) => Record<string, Natives> | undefined;
	getNativeByHash: (hash: string) => Natives | undefined;
}

export const useNativesStore = create<NativesState>((set, get) => ({
	nativesByCategory: {},

	addNatives: (natives) => set({ nativesByCategory: natives }),

	getAllCategories: () => {
		const state = get();
		return Object.keys(state.nativesByCategory);
	},

	getNativesByCategory: (category) => {
		const state = get();
		return state.nativesByCategory[category];
	},

	getNativeByHash: (hash) => {
		const { nativesByCategory } = get();
		for (const category in nativesByCategory) {
			if (nativesByCategory[category][hash]) {
				return nativesByCategory[category][hash];
			}
		}
		return undefined;
	},
}));

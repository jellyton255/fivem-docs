import { create } from "zustand";
import { Natives } from "../types/Natives";

interface NativesState {
	Natives: Record<string, Record<string, Natives>>;
	setNatives: (natives: Record<string, Record<string, Natives>>) => void;
	getAllCategories: () => string[];
	getNativesByCategory: (category: string) => Record<string, Natives> | undefined;
	getNativeByHash: (hash: string) => Natives | undefined;
}

export const useNativesStore = create<NativesState>((set, get) => ({
	Natives: {},

	setNatives: (natives) => set({ Natives: natives }),

	getAllCategories: () => {
		const state = get();
		return Object.keys(state.Natives);
	},

	getNativesByCategory: (category) => {
		const state = get();
		return state.Natives[category];
	},

	getNativeByHash: (hash) => {
		const { Natives } = get();
		for (const category in Natives) {
			if (Natives[category][hash]) {
				return Natives[category][hash];
			}
		}
		return undefined;
	},
}));

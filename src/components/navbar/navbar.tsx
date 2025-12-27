import { Native } from "@/types/Natives";
import NativeLinks from "./native-links";
import NavbarTabs from "./navbar-tabs";
import SearchBar from "./search-bar";

export default function Navbar({ natives }: { natives: Record<string, Record<string, Native>> }) {
  const flatNatives = Object.values(natives).flatMap((category) => Object.values(category));

  return (
    <div className="flex h-full w-full max-w-136 flex-col items-center gap-2 rounded-md bg-neutral-900/50 p-4 px-2 shadow-xs">
      <SearchBar />

      <div className="w-full px-4 text-start text-sm font-semibold text-neutral-500">Developer Reference</div>
      <NavbarTabs natives={natives}>
        <NativeLinks natives={natives} flatNatives={flatNatives} />
      </NavbarTabs>
    </div>
  );
}

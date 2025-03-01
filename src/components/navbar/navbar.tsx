import NativeLinks from "./native-links";
import { Native } from "@/types/Natives";
import SearchBar from "./search-bar";
import NavbarTabs from "./navbar-tabs";

export default function Navbar({ natives }: { natives: Record<string, Record<string, Native>> }) {
  const flatNatives = Object.values(natives).flatMap((category) => Object.values(category));

  return (
    <div className="flex h-full w-full max-w-[34rem] flex-col items-center gap-2 rounded-md bg-neutral-900/50 p-4 px-2 shadow-sm">
      <SearchBar />

      <div className="w-full px-4 text-start text-sm font-semibold text-neutral-500">Developer Reference</div>
      <NavbarTabs natives={natives}>
        <NativeLinks natives={natives} flatNatives={flatNatives} />
      </NavbarTabs>
    </div>
  );
}

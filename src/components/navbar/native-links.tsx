"use client";
import { Native } from "@/types/Natives";
import { camelCaseFromSnakeCase } from "@/utils/stringUtils";
import { searchParams } from "@/app/docs/natives/search-params";
import { Virtuoso } from "react-virtuoso";
import NativeNavLink from "./native-nav-link";
import { useQueryStates } from "nuqs";

export default function NativeLinks({
  natives,
  flatNatives,
}: {
  natives: Record<string, Record<string, Native>>;
  flatNatives: Native[];
}) {
  const [{ hash, search, activeTab, showUnnamedNatives }] = useQueryStates(searchParams);

  let filteredNatives = Object.values(natives[activeTab] || {}).filter((native) =>
    showUnnamedNatives ? true : !!native.name
  );
  if (search && search.length > 0) {
    filteredNatives = flatNatives.filter(
      (native) =>
        native.name &&
        camelCaseFromSnakeCase(native.name).toLowerCase().includes(search.toLowerCase()) &&
        (native.name?.length > 0 || !showUnnamedNatives)
    );
  }

  if (search && filteredNatives.length === 0) {
    return <div className="text-center text-sm text-muted-foreground">No Natives Found</div>;
  }

  return (
    <Virtuoso
      className="h-full"
      data={filteredNatives}
      itemContent={(index, native) => {
        const nativeHash = native.jhash || native.hash;
        return <NativeNavLink key={native.hash} nativeData={native} isActive={hash === nativeHash} />;
      }}
    />
  );
}

"use client";

import { searchParams } from "@/routes/docs/natives/search-params";
import { Native } from "@/types/Natives";
import { camelCaseFromSnakeCase } from "@/utils/stringUtils";
import { useQueryStates } from "nuqs";
import { Virtuoso } from "react-virtuoso";
import NativeNavLink from "./native-nav-link";

function searchForNative(natives: Native[], search: string, showUnnamedNatives: boolean) {
  const searchLower = search.toLowerCase();

  return natives.filter(
    (native) =>
      native.name &&
      (camelCaseFromSnakeCase(native.name).toLowerCase().includes(searchLower) ||
        native.hash.toLowerCase().includes(searchLower)) &&
      (!showUnnamedNatives || native.name?.length > 0)
  );
}

export default function NativeLinks({
  natives,
  flatNatives,
}: {
  natives: Record<string, Record<string, Native>>;
  flatNatives: Native[];
}) {
  const [{ hash: currentHash, search, activeTab, showUnnamedNatives }] = useQueryStates(searchParams);

  let filteredNatives = Object.values(natives[activeTab] || {}).filter((native) =>
    showUnnamedNatives ? true : !!native.name
  );

  if (search && search.length > 0) {
    filteredNatives = searchForNative(flatNatives, search, showUnnamedNatives);
  }

  if (search && filteredNatives.length === 0) {
    return <div className="text-muted-foreground text-center text-sm">No Natives Found</div>;
  }

  return (
    <Virtuoso
      className="h-full"
      data={filteredNatives}
      itemContent={(index, native) => {
        return <NativeNavLink key={native.hash} nativeData={native} isActive={currentHash === native.hash} />;
      }}
    />
  );
}

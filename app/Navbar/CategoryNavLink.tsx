import { useEffect, useMemo } from "react";
import NativeNavLink from "./NativeNavLink";
import { camelCaseFromSnakeCase, capitalizeFirstLetter } from "@/app/_utils/stringUtils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

type CategoryNavLinkProps = {
  categoryName: string;
  categoryNatives: Record<string, any>;
  isOpened: boolean;
  searchTerm: string;
  setOpenedCategory: (categoryName: string) => void;
  isLast: boolean;
};

const maxVisibleItems = 20;
const itemHeightRem = 1.75;

export default function CategoryNavLink({
  categoryName,
  categoryNatives,
  isOpened,
  setOpenedCategory,
  searchTerm,
  isLast,
}: CategoryNavLinkProps) {
  isOpened = isOpened;

  const filteredNatives = useMemo(
    () =>
      searchTerm
        ? Object.entries(categoryNatives).filter(
            ([_, nativeData]) => nativeData.name && camelCaseFromSnakeCase(nativeData.name).toLowerCase().includes(searchTerm.toLowerCase())
          )
        : Object.entries(categoryNatives),
    [searchTerm]
  );

  useEffect(() => {
    if (!isOpened && searchTerm?.length > 1 && filteredNatives.length > 0) {
      setOpenedCategory(categoryName);
    }
  }, [searchTerm]);

  if (searchTerm && filteredNatives.length === 0) {
    return [];
  }

  const listHeight = Math.min(filteredNatives.length, maxVisibleItems) * itemHeightRem;

  return (
    <>
      <Button
        onClick={() => setOpenedCategory(categoryName)}
        variant="secondary"
        size="thin"
        className="flex h-fit w-full scroll-m-20 justify-between gap-2 rounded-md bg-transparent px-5 text-start font-bold tracking-tight transition-all"
      >
        <div>
          {capitalizeFirstLetter(categoryName)} [{filteredNatives.length}]
        </div>
        {<FontAwesomeIcon icon={faChevronLeft} className={cn("text-neutral-500 transition-all", isOpened && "-rotate-90")} />}
      </Button>
      {isOpened && (
        <div
          className="max-h-60 w-[95%] shrink overflow-y-auto"
          style={{
            height: `${listHeight}rem`,
          }}
        >
          {filteredNatives.map(([nativeHash, nativeData]) => (
            <NativeNavLink key={nativeHash} nativeData={nativeData} />
          ))}
        </div>
      )}
      {!isLast && <Separator />}
    </>
  );
}

/*
<Virtuoso
  className="max-h-60 w-[95%] shrink"
  style={{
    height: listHeight + "rem",
  }}
  data={filteredNatives}
  itemContent={(index, [nativeHash, nativeData]) => <NativeNavLink key={nativeHash} nativeData={nativeData} />}
/>
*/

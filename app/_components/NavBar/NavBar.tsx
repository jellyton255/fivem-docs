"use client";
import { useMemo, useState } from "react";
import CategoryNavLink from "./CategoryNavLink";
import { faArrowsToLine, faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { Natives } from "@/app/_types/Natives";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Navbar({ natives }: { natives: Record<string, Record<string, Natives>> }) {
  const [openedCategories, setOpenedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const data = useMemo(() => Object.entries(natives), []);

  const navRoutes = useMemo(() => {
    return data.map(([categoryName, categoryNatives], index) => {
      const isOpened = openedCategories.includes(categoryName);

      const handleSetOpenedCategory = (categoryName: string) => {
        if (openedCategories.includes(categoryName)) {
          // If the category is already opened, remove it from the list
          setOpenedCategories(openedCategories.filter((cat) => cat !== categoryName));
        } else {
          // Otherwise, add it to the list
          setOpenedCategories([...openedCategories, categoryName]);
        }
      };

      return (
        <CategoryNavLink
          key={categoryName}
          isLast={index == data.length - 1}
          categoryName={categoryName}
          categoryNatives={categoryNatives}
          isOpened={isOpened}
          searchTerm={searchTerm}
          setOpenedCategory={handleSetOpenedCategory}
        />
      );
    });
  }, [data, openedCategories, searchTerm, pathname]);

  return (
    <div className="flex h-full w-full max-w-[20rem] flex-col items-center gap-2 rounded-md bg-neutral-900/50 p-4 px-2 shadow-sm">
      <div className="flex w-full items-center gap-2">
        <TooltipProvider delayDuration={0}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" className="p-2" />
          <Input
            className="rounded-sm border-b-2 border-neutral-500/50 px-2"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <FontAwesomeIcon
                icon={faArrowsToLine}
                onClick={() => setOpenedCategories([])}
                size="sm"
                className="cursor-pointer rounded p-2 hover:bg-neutral-800"
              />
            </TooltipTrigger>
            <TooltipContent>Collapse All Categories</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-full px-4 text-start text-sm font-semibold text-neutral-500">Developer Reference</div>
      <ScrollArea className="w-full grow">
        <div className="flex w-full flex-col gap-0.5">{navRoutes}</div>
      </ScrollArea>
    </div>
  );
}

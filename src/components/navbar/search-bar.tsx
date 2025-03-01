"use client";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQueryStates } from "nuqs";
import { Input } from "../ui/input";
import { searchParams } from "@/app/docs/natives/search-params";
import { Button } from "../ui/button";
import { EyeOff } from "lucide-react";

export default function SearchBar() {
  const [{ search, showUnnamedNatives }, setQueryStates] = useQueryStates(searchParams);

  return (
    <div className="flex w-full items-center gap-2">
      <TooltipProvider delayDuration={0}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" className="p-2" />
        <Input
          className="rounded-sm border-b-2 border-neutral-500/50 px-2"
          placeholder="Search"
          value={search}
          onChange={(e) => setQueryStates({ search: e.target.value })}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showUnnamedNatives ? "default" : "ghost"}
              className="h-10 w-10 rounded-sm p-2"
              onClick={() => setQueryStates({ showUnnamedNatives: !showUnnamedNatives })}
            >
              <EyeOff className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{showUnnamedNatives ? "Hide Unnamed Natives" : "Show Unnamed Natives"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

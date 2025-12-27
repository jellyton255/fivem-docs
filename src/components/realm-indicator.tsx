import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/stringUtils";

export type Realm = "client" | "server" | "shared";
type RealmKeys = "client" | "server";
const realmMapper: Record<RealmKeys, string> = {
  client: "bg-orange-600",
  server: "bg-blue-600",
};

const gradient = `linear-gradient(
	50deg,
	#228BE6 50%,
	#F76707 50%
)`;

function RealmIndicator({ realm }: { realm: Realm }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn("size-6 rounded-full", realm != "shared" && realmMapper[realm])}
            style={{
              background: realm == "shared" ? gradient : undefined,
            }}
          />
        </TooltipTrigger>
        <TooltipContent
          className={cn("text-lg font-bold text-neutral-100", realm != "shared" && realmMapper[realm])}
          style={{
            background: realm == "shared" ? gradient : undefined,
          }}
        >
          {capitalizeFirstLetter(realm)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default RealmIndicator;

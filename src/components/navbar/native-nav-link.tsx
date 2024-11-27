import { camelCaseFromSnakeCase } from "@/utils/stringUtils";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Natives } from "@/types/Natives";
import { Button } from "@/components/ui/button";

function NativeNavLink({ nativeData }: { nativeData: Natives }) {
  const pathname = usePathname();

  return (
    <Button
      variant="secondary"
      size="thin"
      asChild
      data-active={pathname == "/docs/natives/_" + (nativeData.jhash || nativeData.hash)}
      className="w-full scroll-m-20 justify-start overflow-hidden text-ellipsis rounded-md bg-transparent pl-8 text-start font-semibold tracking-tight transition-all data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-950"
    >
      <Link
        key={nativeData.jhash || nativeData.hash}
        href={"/docs/natives?hash=" + (nativeData.jhash || nativeData.hash)}
        className="overflow-hidden text-ellipsis"
        prefetch={false}
      >
        {(nativeData.name && camelCaseFromSnakeCase(nativeData?.name)) || nativeData.jhash || nativeData.hash}
      </Link>
    </Button>
  );
}

export default memo(NativeNavLink);

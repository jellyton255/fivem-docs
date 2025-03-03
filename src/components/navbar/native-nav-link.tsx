"use client";
import { camelCaseFromSnakeCase } from "@/utils/stringUtils";
import { Native } from "@/types/Natives";
import { Button } from "@/components/ui/button";
import { useQueryStates } from "nuqs";
import { memo } from "react";
import { searchParams } from "@/app/docs/natives/search-params";

type NativeNavLinkProps = {
  nativeData: Native;
  isActive: boolean;
};

function NativeNavLink({ nativeData, isActive }: NativeNavLinkProps) {
  const hash = nativeData.hash;
  const [_, setQueryStates] = useQueryStates(searchParams);

  const displayName = (nativeData.name && camelCaseFromSnakeCase(nativeData.name)) || hash;

  return (
    <Button
      variant="secondary"
      size="thin"
      data-active={isActive}
      onClick={() => {
        setQueryStates({ hash });
      }}
      className="w-full max-w-full scroll-m-20 justify-start overflow-clip rounded-md bg-transparent px-6 py-4 font-mono text-lg transition-all data-[active=true]:bg-primary data-[active=true]:text-white"
    >
      {displayName}
    </Button>
  );
}

export default memo(NativeNavLink, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive && prevProps.nativeData.hash === nextProps.nativeData.hash;
});

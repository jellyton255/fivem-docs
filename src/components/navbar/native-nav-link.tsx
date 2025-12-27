"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { searchParams } from "@/routes/docs/natives/search-params";
import { Native } from "@/types/Natives";
import { camelCaseFromSnakeCase } from "@/utils/stringUtils";
import { useQueryStates } from "nuqs";

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
      className="data-[active=true]:bg-primary w-full max-w-full scroll-m-20 justify-start overflow-clip rounded-md bg-transparent px-6 py-4 font-mono text-lg transition-all data-[active=true]:text-white"
    >
      {displayName}
    </Button>
  );
}

export default memo(NativeNavLink, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive && prevProps.nativeData.hash === nextProps.nativeData.hash;
});

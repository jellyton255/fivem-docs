"use client";
import { ScrollAreaWithShadow } from "@/components/ui/scroll-area-with-shadow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryStates } from "nuqs";
import { memo } from "react";
import { Native } from "@/types/Natives";
import { searchParams } from "@/app/docs/natives/search-params";

function NavbarTabs({
  natives,
  children,
}: {
  natives: Record<string, Record<string, Native>>;
  children: React.ReactNode;
}) {
  const [{ activeTab }, setQueryStates] = useQueryStates(searchParams);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setQueryStates({ activeTab: value })}
      className="flex h-full w-full flex-col flex-wrap"
    >
      <ScrollAreaWithShadow
        className="w-full"
        orientation="horizontal"
        scrollSpeed={0.6}
        smoothScroll={true}
        easingFactor={0.15}
      >
        <TabsList className="w-max flex-wrap justify-start bg-transparent">
          {Object.keys(natives).map((category) => (
            <TabsTrigger value={category} key={category} onClick={() => setQueryStates({ search: "" })}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollAreaWithShadow>
      <TabsContent value={activeTab} className="flex h-0 w-full grow flex-col overflow-clip">
        {children}
      </TabsContent>
    </Tabs>
  );
}

export default memo(NavbarTabs);

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NavigationSidebar from "./navigation-sidebar";

// Main layout component
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Navigation sidebar */}
      <div className="w-64 shrink-0 border-r border-gray-800 bg-gray-950">
        <ScrollArea className="h-screen p-4">
          <div className="pb-2 text-xl font-bold">Documentation</div>
          <Separator className="my-2" />
          <NavigationSidebar />
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="grow">{children}</div>
    </div>
  );
}

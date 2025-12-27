"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { searchParams } from "@/routes/docs/natives/search-params";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useQueryStates } from "nuqs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const [{ search }] = useQueryStates(searchParams);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "focus-visible:ring-none border-primary inline-flex items-center justify-center rounded-t-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-hidden focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        search == "" &&
          "data-[state=active]:border-primary-foreground data-[state=active]:bg-primary data-[state=active]:border-b-2 data-[state=active]:text-white data-[state=active]:shadow-xs",
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("mt-2 outline-hidden", className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

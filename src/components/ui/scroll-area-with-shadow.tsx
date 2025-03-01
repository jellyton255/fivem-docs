import * as React from "react";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { cn } from "@/lib/utils";

interface ScrollAreaWithShadowProps extends React.ComponentPropsWithoutRef<typeof ScrollArea> {
  orientation?: "horizontal" | "vertical";
  scrollBarClassName?: string;
  thumbClassName?: string;
  scrollSpeed?: number;
  smoothScroll?: boolean;
  easingFactor?: number;
}

export const ScrollAreaWithShadow = React.forwardRef<React.ElementRef<typeof ScrollArea>, ScrollAreaWithShadowProps>(
  (
    {
      className,
      orientation = "horizontal",
      scrollBarClassName,
      thumbClassName,
      scrollSpeed = 1,
      smoothScroll = true,
      easingFactor = 0.2,
      children,
      ...props
    },
    ref
  ) => {
    const [showLeftShadow, setShowLeftShadow] = React.useState(false);
    const [showRightShadow, setShowRightShadow] = React.useState(false);
    const [showTopShadow, setShowTopShadow] = React.useState(false);
    const [showBottomShadow, setShowBottomShadow] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const animationRef = React.useRef<number | null>(null);
    const targetScrollRef = React.useRef<number | null>(null);
    const currentScrollRef = React.useRef<number>(0);
    const maxScrollRef = React.useRef<number>(0);

    // Calculate and update the maximum scroll value
    const updateMaxScroll = React.useCallback(() => {
      const element = containerRef.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLElement | null;
      if (!element) return 0;

      if (orientation === "horizontal") {
        const { scrollWidth, clientWidth } = element;
        const maxScroll = Math.max(0, scrollWidth - clientWidth);
        maxScrollRef.current = maxScroll;
        return maxScroll;
      } else {
        const { scrollHeight, clientHeight } = element;
        return Math.max(0, scrollHeight - clientHeight);
      }
    }, [orientation]);

    const handleScroll = React.useCallback(() => {
      if (!containerRef.current) return;

      const element = containerRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (!element) return;

      if (orientation === "horizontal") {
        const { scrollLeft, scrollWidth, clientWidth } = element as HTMLElement;
        currentScrollRef.current = scrollLeft;
        updateMaxScroll();
        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
      } else {
        const { scrollTop, scrollHeight, clientHeight } = element as HTMLElement;
        setShowTopShadow(scrollTop > 0);
        setShowBottomShadow(scrollTop < scrollHeight - clientHeight - 1); // -1 for rounding errors
      }
    }, [orientation, updateMaxScroll]);

    // Smooth scroll animation
    const animateScroll = React.useCallback(() => {
      if (targetScrollRef.current === null) return;

      const element = containerRef.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLElement | null;
      if (!element) return;

      const currentScroll = currentScrollRef.current;
      const targetScroll = targetScrollRef.current;

      // Calculate the distance to scroll
      const diff = targetScroll - currentScroll;

      // If we're close enough, just set to the target value
      if (Math.abs(diff) < 0.5) {
        element.scrollLeft = targetScroll;
        currentScrollRef.current = targetScroll;
        targetScrollRef.current = null;
        animationRef.current = null;
        return;
      }

      // Calculate the next scroll position with easing
      // Using the easingFactor to control how smooth the animation is
      // Lower values = smoother but slower, higher values = faster but less smooth
      const newScrollLeft = currentScroll + diff * easingFactor;

      // Update the scroll position
      element.scrollLeft = newScrollLeft;
      currentScrollRef.current = newScrollLeft;

      // Continue the animation
      animationRef.current = requestAnimationFrame(animateScroll);
    }, [easingFactor]);

    // Clamp a value between min and max
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    // Handle wheel events to convert vertical scrolling to horizontal scrolling
    const handleWheel = React.useCallback(
      (event: Event) => {
        if (orientation !== "horizontal") return;

        const wheelEvent = event as WheelEvent;
        const element = containerRef.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLElement | null;
        if (!element) return;

        // Prevent the default vertical scroll
        wheelEvent.preventDefault();

        // Update max scroll value
        const maxScroll = updateMaxScroll();

        // Convert vertical delta to horizontal scrolling
        // Using deltaY for most mouse wheels, but also support deltaX for trackpads
        const delta = Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY) ? wheelEvent.deltaX : wheelEvent.deltaY;

        // Apply scroll speed multiplier and adjust for high-resolution wheels
        const scrollAmount = delta * scrollSpeed * (wheelEvent.deltaMode === 1 ? 16 : 1);

        if (smoothScroll) {
          // For smooth scrolling, set the target and start animation if not already running
          const currentTarget = targetScrollRef.current !== null ? targetScrollRef.current : currentScrollRef.current;

          // Clamp the target scroll value to prevent scrolling beyond boundaries
          targetScrollRef.current = clamp(currentTarget + scrollAmount, 0, maxScroll);

          if (animationRef.current === null) {
            animationRef.current = requestAnimationFrame(animateScroll);
          }
        } else {
          // For immediate scrolling, clamp the value
          const newScrollLeft = clamp(element.scrollLeft + scrollAmount, 0, maxScroll);
          element.scrollLeft = newScrollLeft;
        }

        // Update shadow visibility
        handleScroll();
      },
      [orientation, handleScroll, scrollSpeed, smoothScroll, animateScroll, updateMaxScroll]
    );

    React.useEffect(() => {
      const element = containerRef.current?.querySelector("[data-radix-scroll-area-viewport]");
      if (!element) return;

      // Initial check and update max scroll
      updateMaxScroll();
      handleScroll();

      // Add event listeners
      element.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", () => {
        updateMaxScroll();
        handleScroll();
      });

      // Add wheel event listener for horizontal scrolling
      if (orientation === "horizontal") {
        element.addEventListener("wheel", handleWheel, { passive: false });
      }

      // Cleanup
      return () => {
        element.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);

        if (orientation === "horizontal") {
          element.removeEventListener("wheel", handleWheel);
        }

        // Cancel any ongoing animations
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [handleScroll, handleWheel, orientation, updateMaxScroll]);

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        {orientation === "horizontal" && (
          <>
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 top-0 z-10 h-full w-8 rounded-l-md bg-gradient-to-r from-black/30 to-transparent opacity-0 transition-opacity duration-200",
                showLeftShadow && "opacity-100"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-0 top-0 z-10 h-full w-8 rounded-r-md bg-gradient-to-l from-black/30 to-transparent opacity-0 transition-opacity duration-200",
                showRightShadow && "opacity-100"
              )}
            />
          </>
        )}

        {orientation === "vertical" && (
          <>
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 top-0 z-10 h-8 w-full bg-gradient-to-b from-background to-transparent opacity-0 transition-opacity duration-200",
                showTopShadow && "opacity-100"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-full bg-gradient-to-t from-background to-transparent opacity-0 transition-opacity duration-200",
                showBottomShadow && "opacity-100"
              )}
            />
          </>
        )}

        <ScrollArea ref={ref} {...props}>
          {children}
          {/* <ScrollBar orientation={orientation} className={scrollBarClassName} thumbClassName={thumbClassName} /> */}
        </ScrollArea>
      </div>
    );
  }
);

ScrollAreaWithShadow.displayName = "ScrollAreaWithShadow";

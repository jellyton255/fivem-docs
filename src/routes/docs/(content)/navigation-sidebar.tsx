"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ContentItem {
  title: string;
  path: string;
  weight: number;
  children: ContentItem[];
}

// Navigation tree component
function NavigationTree({ items, currentPath }: { items: ContentItem[]; currentPath: string }) {
  return (
    <ul className="space-y-1 py-2">
      {items.map((item) => {
        // Make sure path is a simple string without Next.js routing patterns
        const safePath = item.path.replace(/[\[\]\(\)]/g, "");
        const isActive = currentPath === safePath || currentPath.startsWith(`${safePath}/`);
        const hasChildren = item.children.length > 0;

        return (
          <li key={safePath} className={isActive ? "font-semibold" : ""}>
            <Link
              href={`/docs/${safePath}`}
              className={`block px-2 py-1 ${isActive ? "bg-blue-900/20 text-blue-400" : "hover:bg-blue-900/10"}`}
            >
              {item.title}
            </Link>

            {hasChildren &&
              (isActive ||
                item.children.some((child) => {
                  const childSafePath = child.path.replace(/[\[\]\(\)]/g, "");
                  return currentPath === childSafePath || currentPath.startsWith(`${childSafePath}/`);
                })) && (
                <ul className="ml-4 border-l border-gray-700 pl-2 pt-1">
                  <NavigationTree items={item.children} currentPath={currentPath} />
                </ul>
              )}
          </li>
        );
      })}
    </ul>
  );
}

export default function NavigationSidebar() {
  const pathname = usePathname();
  const [contentStructure, setContentStructure] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract slug parts from pathname and clean it
  const currentPath = pathname.replace(/^\/docs\/?/, "").replace(/[\[\]\(\)]/g, "");

  useEffect(() => {
    // Fetch the content structure
    async function fetchContentStructure() {
      try {
        const response = await fetch("/api/content-structure");
        if (response.ok) {
          const data = await response.json();
          setContentStructure(data);
        }
      } catch (error) {
        console.error("Failed to fetch content structure:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContentStructure();
  }, []);

  if (loading) {
    return <div className="py-4 text-sm text-gray-500">Loading...</div>;
  }

  return <NavigationTree items={contentStructure} currentPath={currentPath} />;
}

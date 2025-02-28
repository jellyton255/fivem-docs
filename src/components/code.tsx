"use client";
import hljs, { AutoHighlightResult, HighlightResult } from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import lua from "highlight.js/lib/languages/lua";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("lua", lua);

export default function Highlight({ code, language }: { code: string; language?: string }) {
  let highlight: HighlightResult | AutoHighlightResult;

  if (language) highlight = hljs.highlight(code, { language });
  else highlight = hljs.highlightAuto(code);

  return (
    <ScrollArea >
    <pre
      dangerouslySetInnerHTML={{
        __html: highlight.value,
      }}
    />
    <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

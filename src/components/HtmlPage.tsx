"use client";

import { useEffect, useState } from "react";
import { initNavIsland } from "./nav-island";

type HtmlPageProps = {
  markup: string;
  scripts: readonly string[];
  label: string;
};

const ranPages = new Set<string>();

export default function HtmlPage({ markup, scripts, label }: HtmlPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const cleanupIsland = initNavIsland();

    if (!ranPages.has(label)) {
      ranPages.add(label);
      for (const source of scripts) {
        try {
          // Scripts from the original HTML expect a browser document.
          const run = new Function(source);
          run();
        } catch (error) {
          console.error(`${label} script failed:`, error);
        }
      }
    }

    return cleanupIsland;
  }, [mounted, label, scripts]);

  // Avoid SSR/client HTML mismatches from the ported markup + DOM scripts.
  if (!mounted) {
    return <div aria-hidden="true" style={{ minHeight: "100vh" }} />;
  }

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

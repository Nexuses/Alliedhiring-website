"use client";

import { useEffect, useRef } from "react";
import { aboutMarkup } from "./about-markup";
import { aboutScripts } from "./about-scripts";
import { initNavIsland } from "./nav-island";

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    const cleanupIsland = initNavIsland();
    if (!ranRef.current) {
      ranRef.current = true;
      for (const source of aboutScripts) {
        try {
          const run = new Function(source);
          run();
        } catch (error) {
          console.error("About page script failed:", error);
        }
      }
    }
    return cleanupIsland;
  }, []);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: aboutMarkup }}
    />
  );
}

"use client";

import { useEffect, useRef } from "react";
import { homeMarkup } from "./home-markup";
import { homeScripts } from "./home-scripts";
import { initNavIsland } from "./nav-island";

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    const cleanupIsland = initNavIsland();
    if (!ranRef.current) {
      ranRef.current = true;
      for (const source of homeScripts) {
        try {
          // Scripts from the original HTML expect a browser document.
          const run = new Function(source);
          run();
        } catch (error) {
          console.error("Homepage script failed:", error);
        }
      }
    }
    return cleanupIsland;
  }, []);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: homeMarkup }}
    />
  );
}

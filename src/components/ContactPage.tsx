"use client";

import { useEffect, useRef } from "react";
import { contactMarkup } from "./contact-markup";
import { contactScripts } from "./contact-scripts";
import { initNavIsland } from "./nav-island";

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    const cleanupIsland = initNavIsland();
    if (!ranRef.current) {
      ranRef.current = true;
      for (const source of contactScripts) {
        try {
          const run = new Function(source);
          run();
        } catch (error) {
          console.error("Contact page script failed:", error);
        }
      }
    }
    return cleanupIsland;
  }, []);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: contactMarkup }}
    />
  );
}

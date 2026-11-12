"use client";

import { useEffect, useRef } from "react";
import { aboutMarkup } from "./about-markup";
import { aboutScripts } from "./about-scripts";

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    for (const source of aboutScripts) {
      try {
        const run = new Function(source);
        run();
      } catch (error) {
        console.error("About page script failed:", error);
      }
    }
  }, []);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: aboutMarkup }}
    />
  );
}

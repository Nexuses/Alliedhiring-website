"use client";

import { useEffect, useRef } from "react";
import { contactMarkup } from "./contact-markup";
import { contactScripts } from "./contact-scripts";

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    for (const source of contactScripts) {
      try {
        const run = new Function(source);
        run();
      } catch (error) {
        console.error("Contact page script failed:", error);
      }
    }
  }, []);

  return (
    <div
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: contactMarkup }}
    />
  );
}

"use client";

import { aboutMarkup } from "./about-markup";
import { aboutScripts } from "./about-scripts";
import HtmlPage from "./HtmlPage";

export default function AboutPage() {
  return (
    <HtmlPage markup={aboutMarkup} scripts={aboutScripts} label="about" />
  );
}

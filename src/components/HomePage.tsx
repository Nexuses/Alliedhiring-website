"use client";

import { homeMarkup } from "./home-markup";
import { homeScripts } from "./home-scripts";
import HtmlPage from "./HtmlPage";

export default function HomePage() {
  return (
    <HtmlPage markup={homeMarkup} scripts={homeScripts} label="home" />
  );
}

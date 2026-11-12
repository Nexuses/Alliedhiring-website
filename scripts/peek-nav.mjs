import { homeMarkup } from "../src/components/home-markup.ts";
import { aboutMarkup } from "../src/components/about-markup.ts";

function nav(html, label) {
  const start = html.indexOf('<nav class="menu"');
  const end = html.indexOf("</header>", start);
  console.log(`\n=== ${label} ===`);
  console.log(html.slice(start, end));
}

nav(homeMarkup, "HOME");
nav(aboutMarkup, "ABOUT");

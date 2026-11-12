import { homeMarkup } from "../src/components/home-markup.ts";
import { aboutMarkup } from "../src/components/about-markup.ts";

function findSection(html, markers, label) {
  for (const m of markers) {
    const i = html.toLowerCase().indexOf(m.toLowerCase());
    if (i !== -1) {
      console.log(`\n=== ${label} @ ${m} ===`);
      console.log(html.slice(Math.max(0, i - 200), i + 1200));
      return;
    }
  }
  console.log(`\n=== ${label} NOT FOUND ===`);
}

findSection(homeMarkup, ["How to start", "how to start", "id=\"contact\"", "class=\"cta\""], "HOME");
findSection(aboutMarkup, ["ab-cta", "Build your India team", "Share Your Requirement"], "ABOUT");

console.log("\n=== HOME NAV BTN ===");
const navBtn = homeMarkup.match(/<a class="btn btn-navy"[^>]*>[\s\S]*?<\/a>/);
console.log(navBtn?.[0]);

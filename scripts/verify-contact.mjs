import { contactMarkup } from "../src/components/contact-markup.ts";
import { homeMarkup } from "../src/components/home-markup.ts";
import { aboutMarkup } from "../src/components/about-markup.ts";

function nav(html, label) {
  const start = html.indexOf('<nav class="menu"');
  const end = html.indexOf("</header>", start);
  console.log(`\n=== ${label} ===`);
  console.log(html.slice(start, end));
}

nav(contactMarkup, "CONTACT");
console.log("\nHome Book a call href:", homeMarkup.match(/href="[^"]*">Book a call/)?.[0]);
console.log("About Book a call href:", aboutMarkup.match(/href="[^"]*">Book a call/)?.[0]);
console.log("Contact has form:", /<form[\s\S]*leadform|cta-form|requirement/i.test(contactMarkup));
console.log("Leftover html links:", /allied-hiring-|\.html/.test(contactMarkup));

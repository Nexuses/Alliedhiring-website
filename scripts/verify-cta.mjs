import { homeMarkup } from "../src/components/home-markup.ts";
import { aboutMarkup } from "../src/components/about-markup.ts";

console.log("Home has How to start:", homeMarkup.includes("How to start"));
console.log("Home has ab-cta:", homeMarkup.includes("ab-cta"));
console.log("Home has Share your needs:", homeMarkup.includes("Share your needs"));
console.log("Home has Book a 20-minute call:", homeMarkup.includes("Book a 20-minute call"));
console.log("Home has Share your requirements:", homeMarkup.includes("Share your requirements"));
console.log("Home nav Book a call:", homeMarkup.includes(">Book a call <"));
console.log("About nav Book a call:", aboutMarkup.includes(">Book a call <"));

const i = homeMarkup.indexOf('id="contact"');
console.log("\n--- contact section ---");
console.log(homeMarkup.slice(i - 80, i + 700));

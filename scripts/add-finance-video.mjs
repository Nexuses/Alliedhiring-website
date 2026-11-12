import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const markupPath = path.join(__dirname, "..", "src", "components", "home-markup.ts");
const url =
  "https://allied-hiring.s3.us-east-2.amazonaws.com/Finance_and_accounting__1__1794487905233_7twn.mp4";

let source = fs.readFileSync(markupPath, "utf8");
const match = source.match(/export const homeMarkup = (".*");\n?$/s);
if (!match) throw new Error("Could not parse home-markup.ts");
let html = JSON.parse(match[1]);

if (html.includes("Finance_and_accounting")) {
  console.log("Finance video already present");
  process.exit(0);
}

const re =
  /(<div class="tk(?: lt)?" data-n="01" style="[^"]*">)(<h4>Finance and accounting<\/h4>)/;
if (!re.test(html)) throw new Error("Finance and accounting card not found");

html = html.replace(re, (_m, open, h4) => {
  const withVideoClass = open.replace('class="tk', 'class="tk has-video');
  const videoTag = `<video class="tk-video" src="${url}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>`;
  return `${withVideoClass}${videoTag}${h4}`;
});

fs.writeFileSync(markupPath, `export const homeMarkup = ${JSON.stringify(html)};\n`);
console.log("Added Finance and accounting video");

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const markupPath = path.join(root, "src", "components", "home-markup.ts");

const videos = {
  "HR and people":
    "https://allied-hiring.s3.us-east-2.amazonaws.com/HR_and_people_1794487299726_tw6a.mp4",
  "Marketing and sales":
    "https://allied-hiring.s3.us-east-2.amazonaws.com/Marketing_1794487381193_0c4q.mp4",
  "Customer support":
    "https://allied-hiring.s3.us-east-2.amazonaws.com/Customer_support_1794487354159_nhwn.mp4",
  "Software development":
    "https://allied-hiring.s3.us-east-2.amazonaws.com/Software_development_1794487276456_04fa.mp4",
  "Data, AI and cloud":
    "https://allied-hiring.s3.us-east-2.amazonaws.com/Cloud__DevOps_and_security_1794487324929_dkdj.mp4",
};

let source = fs.readFileSync(markupPath, "utf8");
const match = source.match(/export const homeMarkup = (".*");\n?$/s);
if (!match) throw new Error("Could not parse home-markup.ts");
let html = JSON.parse(match[1]);

for (const [title, url] of Object.entries(videos)) {
  const re = new RegExp(
    `(<div class="tk(?: lt)?" data-n="\\d+" style="[^"]*">)(<h4>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h4>)`,
    "g"
  );
  const videoTag = `<video class="tk-video" src="${url}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>`;
  let replaced = false;
  html = html.replace(re, (_m, open, h4) => {
    replaced = true;
    const withVideoClass = open.replace('class="tk', 'class="tk has-video');
    return `${withVideoClass}${videoTag}${h4}`;
  });
  if (!replaced) {
    throw new Error(`Could not find talent card for: ${title}`);
  }
}

fs.writeFileSync(
  markupPath,
  `export const homeMarkup = ${JSON.stringify(html)};\n`
);
console.log("Added talent videos for:", Object.keys(videos).join(", "));

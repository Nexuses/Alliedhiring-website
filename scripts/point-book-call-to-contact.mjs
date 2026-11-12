import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function updateMarkup(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/export const (\w+) = (".*");\n?$/s);
  if (!match) throw new Error(`Could not parse ${filePath}`);
  const exportName = match[1];
  let html = JSON.parse(match[2]);

  html = html
    .replaceAll('href="/#contact">Book a call', 'href="/contact">Book a call')
    .replaceAll('href="#contact">Book a call', 'href="/contact">Book a call')
    .replace(
      /(<div class="topbar">[\s\S]*?<a href=")(?:\/#contact|#contact)(")/,
      "$1/contact$2"
    );

  fs.writeFileSync(
    filePath,
    `export const ${exportName} = ${JSON.stringify(html)};\n`
  );
  console.log(`Updated links in ${path.basename(filePath)}`);
}

updateMarkup(path.join(root, "src", "components", "home-markup.ts"));
updateMarkup(path.join(root, "src", "components", "about-markup.ts"));

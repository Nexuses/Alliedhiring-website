import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const menuLinks = [
  ['Home', '/'],
  ['About us', '/about'],
  ['Services', '/#services'],
  ['Insights', '/insights'],
]
  .map(([label, href]) => `<a href="${href}">${label}</a>`)
  .join("");

const newMenu = `<nav class="menu" id="menu">\n      ${menuLinks}\n    </nav>`;

function updateFile(filePath, contactHref, logoHref) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/export const (\w+) = (".*");\n?$/s);
  if (!match) throw new Error(`Could not parse ${filePath}`);
  const exportName = match[1];
  let html = JSON.parse(match[2]);

  html = html.replace(
    /<nav class="menu" id="menu">[\s\S]*?<\/nav>/,
    newMenu
  );

  html = html.replace(
    /<a class="btn btn-navy" href="[^"]*">[\s\S]*?<\/a>(\s*<button class="burger")/,
    `<a class="btn btn-navy" href="${contactHref}">Contact <span class="arr">↗</span></a>$1`
  );

  html = html.replace(
    /<a href="[^"]*" class="logo"/,
    `<a href="${logoHref}" class="logo"`
  );

  fs.writeFileSync(
    filePath,
    `export const ${exportName} = ${JSON.stringify(html)};\n`
  );
  console.log(`Updated nav in ${path.basename(filePath)}`);
}

updateFile(
  path.join(root, "src", "components", "home-markup.ts"),
  "/#contact",
  "/"
);
updateFile(
  path.join(root, "src", "components", "about-markup.ts"),
  "/#contact",
  "/"
);

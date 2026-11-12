import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcHtml = path.resolve(root, "..", "allied-hiring-contact (1).html");

const outPublic = path.join(root, "public");
const outCss = path.join(root, "src", "app", "contact", "contact.css");
const outMarkup = path.join(root, "src", "components", "contact-markup.ts");
const outScripts = path.join(root, "src", "components", "contact-scripts.ts");

fs.mkdirSync(outPublic, { recursive: true });
fs.mkdirSync(path.dirname(outCss), { recursive: true });
fs.mkdirSync(path.dirname(outMarkup), { recursive: true });

const html = fs.readFileSync(srcHtml, "utf8");

let css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
const scriptBlocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  (m) => m[1]
);

const existingByHash = new Map();
for (const name of fs.readdirSync(outPublic)) {
  const full = path.join(outPublic, name);
  if (!fs.statSync(full).isFile()) continue;
  const hash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(full))
    .digest("hex");
  existingByHash.set(hash, name);
}

function storeAsset(buffer, preferredName) {
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  const existing = existingByHash.get(hash);
  if (existing) return existing;
  fs.writeFileSync(path.join(outPublic, preferredName), buffer);
  existingByHash.set(hash, preferredName);
  return preferredName;
}

let cssImg = 0;
css = css.replace(
  /url\(data:image\/([a-zA-Z0-9+.-]+);base64,([^)]+)\)/g,
  (_m, type, b64) => {
    const ext = type === "jpeg" ? "jpg" : type;
    const preferred = `contact-css-asset-${cssImg++}.${ext}`;
    const name = storeAsset(Buffer.from(b64, "base64"), preferred);
    return `url(/${name})`;
  }
);

fs.writeFileSync(outCss, css);

let logoIdx = 0;
let cleanedBody = body
  .replace(
    /src="data:image\/([a-zA-Z0-9+.-]+);base64,([^"]+)"/g,
    (_m, type, b64) => {
      const ext = type === "jpeg" ? "jpg" : type;
      const preferred = logoIdx === 0 ? `logo.${ext}` : `logo-footer.${ext}`;
      logoIdx++;
      const name = storeAsset(Buffer.from(b64, "base64"), preferred);
      return `src="/${name}"`;
    }
  )
  .trim();

const menuLinks = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Services", "/#services"],
  ["Insights", "/insights"],
]
  .map(([label, href]) => `<a href="${href}">${label}</a>`)
  .join("");

cleanedBody = cleanedBody
  .replace(
    /href="allied-hiring-home-v2\.html(#[^"]*)?"/g,
    (_m, hash = "") => `href="/${hash || ""}"`
  )
  .replaceAll('href="allied-hiring-about.html"', 'href="/about"')
  .replaceAll('href="allied-hiring-contact.html"', 'href="/contact"')
  .replaceAll('href="about.html"', 'href="/about"')
  .replaceAll('href="contact.html"', 'href="/contact"')
  .replace(
    /<nav class="menu" id="menu">[\s\S]*?<\/nav>/,
    `<nav class="menu" id="menu">\n      ${menuLinks}\n    </nav>`
  )
  .replace(
    /<a class="btn btn-navy" href="[^"]*">[\s\S]*?<\/a>(\s*<button class="burger")/,
    `<a class="btn btn-navy" href="/contact">Book a call <span class="arr">↗</span></a>$1`
  )
  .replace(
    /<a href="[^"]*" class="logo"/,
    `<a href="/" class="logo"`
  )
  .replace(
    /(<div class="topbar">[\s\S]*?<a href=")[^"]+(")/,
    `$1/contact$2`
  );

fs.writeFileSync(
  outMarkup,
  `export const contactMarkup = ${JSON.stringify(cleanedBody)};\n`
);

fs.writeFileSync(
  outScripts,
  `export const contactScripts = ${JSON.stringify(scriptBlocks)} as const;\n`
);

console.log("Converted contact page:");
console.log(`- CSS assets written/reused: ${cssImg}`);
console.log(`- Logos processed: ${logoIdx}`);
console.log(`- Scripts: ${scriptBlocks.length}`);
console.log(`- CSS -> ${outCss}`);
console.log(`- Markup -> ${outMarkup}`);
console.log(`- Scripts -> ${outScripts}`);

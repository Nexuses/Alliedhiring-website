import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcHtml = path.resolve(
  root,
  "..",
  "allied-hiring-home-v2 (3).html"
);

const outPublic = path.join(root, "public");
const outCss = path.join(root, "src", "app", "home.css");
const outMarkup = path.join(root, "src", "components", "home-markup.ts");
const outScripts = path.join(root, "src", "components", "home-scripts.ts");

fs.mkdirSync(outPublic, { recursive: true });
fs.mkdirSync(path.dirname(outCss), { recursive: true });
fs.mkdirSync(path.dirname(outMarkup), { recursive: true });

const html = fs.readFileSync(srcHtml, "utf8");

let css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
const scriptBlocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  (m) => m[1]
);

let cssImg = 0;
css = css.replace(
  /url\(data:image\/([a-zA-Z0-9+.-]+);base64,([^)]+)\)/g,
  (_m, type, b64) => {
    const ext = type === "jpeg" ? "jpg" : type;
    const name = `css-asset-${cssImg++}.${ext}`;
    fs.writeFileSync(path.join(outPublic, name), Buffer.from(b64, "base64"));
    return `url(/${name})`;
  }
);

fs.writeFileSync(outCss, css);

let logoIdx = 0;
const cleanedBody = body
  .replace(/src="data:image\/([a-zA-Z0-9+.-]+);base64,([^"]+)"/g, (_m, type, b64) => {
    const ext = type === "jpeg" ? "jpg" : type;
    const name = logoIdx === 0 ? `logo.${ext}` : `logo-footer.${ext}`;
    fs.writeFileSync(path.join(outPublic, name), Buffer.from(b64, "base64"));
    logoIdx++;
    return `src="/${name}"`;
  })
  .trim();

fs.writeFileSync(
  outMarkup,
  `export const homeMarkup = ${JSON.stringify(cleanedBody)};\n`
);

fs.writeFileSync(
  outScripts,
  `export const homeScripts = ${JSON.stringify(scriptBlocks)} as const;\n`
);

console.log("Converted:");
console.log(`- CSS assets: ${cssImg}`);
console.log(`- Logos: ${logoIdx}`);
console.log(`- Scripts: ${scriptBlocks.length}`);
console.log(`- CSS -> ${outCss}`);
console.log(`- Markup -> ${outMarkup}`);
console.log(`- Scripts -> ${outScripts}`);

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadMarkup(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/export const (\w+) = (".*");\n?$/s);
  if (!match) throw new Error(`Could not parse ${filePath}`);
  return {
    source,
    exportName: match[1],
    html: JSON.parse(match[2]),
    filePath,
  };
}

function saveMarkup({ filePath, exportName, html }) {
  fs.writeFileSync(
    filePath,
    `export const ${exportName} = ${JSON.stringify(html)};\n`
  );
}

const homePath = path.join(root, "src", "components", "home-markup.ts");
const aboutPath = path.join(root, "src", "components", "about-markup.ts");

const home = loadMarkup(homePath);
const about = loadMarkup(aboutPath);

const newCta = `<!-- CTA -->
<section class="ab-sec" id="contact" style="padding-top:0">
  <div class="wrap">
    <div class="ab-cta">
      <h2>Share your needs. <b>Approve a free shortlist.</b></h2>
      <div class="ab-cta-actions">
        <a class="btn btn-lime" href="mailto:contact@alliedhiring.com?subject=20-minute%20call%20request">Book a 20-minute call <span class="arr">↗</span></a>
        <a class="btn btn-ghost" href="mailto:contact@alliedhiring.com">Share your requirements <span class="arr">↗</span></a>
      </div>
    </div>
  </div>
</section>`;

if (!home.html.includes('id="contact"')) {
  throw new Error("Home contact section not found");
}

home.html = home.html.replace(
  /<!-- CTA \/ FORM -->[\s\S]*?<section class="cta" id="contact">[\s\S]*?<\/section>/,
  newCta
);

if (home.html.includes("How to start") || home.html.includes("cta-lime")) {
  // fallback: replace by id=contact section only
  home.html = home.html.replace(
    /<section class="cta" id="contact">[\s\S]*?<\/section>/,
    newCta.replace("<!-- CTA -->\n", "")
  );
}

if (home.html.includes("How to start")) {
  throw new Error("Failed to replace How to start section");
}

function renameNavBtn(html) {
  return html.replace(
    /(<a class="btn btn-navy" href="\/#contact">)Contact( <span class="arr">↗<\/span><\/a>)/,
    "$1Book a call$2"
  );
}

home.html = renameNavBtn(home.html);
about.html = renameNavBtn(about.html);

saveMarkup(home);
saveMarkup(about);
console.log("Updated home CTA and nav buttons");

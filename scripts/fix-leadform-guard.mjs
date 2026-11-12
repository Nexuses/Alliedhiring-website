import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "src", "components", "home-scripts.ts");
let source = fs.readFileSync(filePath, "utf8");

const old =
  "document.getElementById('leadform').addEventListener('submit',function(e){";
const neu =
  "var lf=document.getElementById('leadform');if(lf)lf.addEventListener('submit',function(e){";

if (!source.includes(old)) {
  if (source.includes("var lf=document.getElementById('leadform')")) {
    console.log("Leadform guard already present");
    process.exit(0);
  }
  throw new Error("Leadform listener not found");
}

source = source.replace(old, neu);
fs.writeFileSync(filePath, source);
console.log("Guarded leadform submit handler");

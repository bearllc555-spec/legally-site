import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "_webflow-source.html");
const imagesDir = path.join(root, "public", "images");
const outHtml = path.join(root, "src", "webflow", "markup.html");

if (!fs.existsSync(sourcePath)) {
  console.error("Missing _webflow-source.html");
  process.exit(1);
}

let html = fs.readFileSync(sourcePath, "utf8");

const imageRegex =
  /https:\/\/cdn\.prod\.website-files\.com\/[^"'\s)>]+?\.(?:webp|png|jpg|jpeg|svg|avif)(?:\?[^"'\s)>]*)?/gi;
const matches = [...new Set(html.match(imageRegex) ?? [])];

fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(path.dirname(outHtml), { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    const clean = url.split("?")[0];
    const fileName = decodeURIComponent(path.basename(new URL(clean).pathname));
    const dest = path.join(imagesDir, fileName);
    if (fs.existsSync(dest)) {
      resolve({ fileName, dest });
      return;
    }
    const file = fs.createWriteStream(dest);
    https
      .get(clean, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          file.close();
          fs.unlinkSync(dest);
          download(res.headers.location).then(resolve).catch(reject);
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve({ fileName, dest })));
      })
      .on("error", (err) => {
        fs.unlink(dest, () => reject(err));
      });
  });
}

console.log(`Downloading ${matches.length} assets…`);
for (const url of matches) {
  try {
    await download(url);
    process.stdout.write(".");
  } catch (e) {
    console.warn(`\nFailed ${url}:`, e.message);
  }
}
console.log("\nRewriting asset URLs…");

for (const url of matches) {
  const clean = url.split("?")[0];
  const fileName = decodeURIComponent(path.basename(new URL(clean).pathname));
  const local = `/images/${fileName.split("/").map(encodeURIComponent).join("/")}`;
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  html = html.replace(new RegExp(escaped, "g"), local);
  const cleanEscaped = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  html = html.replace(new RegExp(cleanEscaped, "g"), local);
}

// Remove Temlis floating widget
html = html.replace(
  /<div>\s*<div data-wf--new-base--temlis-new--variant[\s\S]*?<\/div>\s*<\/div>\s*(?=<script)/i,
  "",
);

// Strip Webflow / jQuery scripts — interactions handled in React
html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

// Extract global embed styles + main wrapper
const globalMatch = html.match(
  /<div class="global-styles w-embed"><style>([\s\S]*?)<\/style><\/div>/i,
);
const globalStyles = globalMatch?.[1] ?? "";

function extractMainWrapper(source) {
  const open = '<div class="main-wrapper">';
  const start = source.indexOf(open);
  if (start < 0) return null;
  const innerStart = start + open.length;
  let depth = 1;
  const re = /<div\b[^>]*>|<\/div>/gi;
  re.lastIndex = innerStart;
  let end = innerStart;
  let match;
  while ((match = re.exec(source)) && depth > 0) {
    if (match[0].startsWith("<div")) depth += 1;
    else depth -= 1;
    if (depth === 0) end = match.index;
  }
  if (depth !== 0) return null;
  return source.slice(innerStart, end);
}

const mainHtml = extractMainWrapper(html);
if (!mainHtml) {
  console.error("Could not extract main-wrapper");
  process.exit(1);
}
console.log(`Extracted main-wrapper (${(mainHtml.length / 1024).toFixed(0)} KB)`);

// Point internal links to hash anchors on single-page clone
let processed = mainHtml
  .replace(/href="\/"/g, 'href="#" data-home-link="true"')
  .replace(/href="\/contact-us"/g, 'href="#contact"')
  .replace(/href="\/services"/g, 'href="#services"')
  .replace(/href="\/about-us"/g, 'href="#about"')
  .replace(/href="\/blog"/g, 'href="#blog"')
  .replace(/href="https:\/\/www\.temlis\.com\/[^"]*"/g, 'href="#contact"')
  .replace(/target="_blank"/g, "")
  .replace(
    /<a href="https:\/\/webflow\.com\/"\s*class="footer_link">Powered by Webflow<\/a>/gi,
    '<a href="https://998webdesigns.com" class="footer_link">Built by 998 web designs</a>',
  );

const sectionIds = [
  ["section_services", "services"],
  ["section_start", "about"],
  ["section_team", "team"],
  ["section_contact", "contact"],
  ["section_cta", "blog"],
];
for (const [cls, id] of sectionIds) {
  processed = processed.replace(
    new RegExp(`<section([^>]*?)class="([^"]*\\b${cls}\\b[^"]*)"`, "i"),
    `<section$1id="${id}" class="$2"`,
  );
}

// Remove bulky Webflow commerce query payloads (cart button markup stays)
processed = processed.replace(/\sdata-wf-cart-query="[^"]*"/gi, "");
processed = processed.replace(/\sdata-wf-bindings="[^"]*"/gi, "");

// Webflow IX inline animation states break layout without webflow.js
processed = processed.replace(
  /\sstyle="[^"]*(?:opacity:0|scale3d|translate3d|will-change)[^"]*"/gi,
  "",
);
processed = processed.replace(
  /(<div[^>]*class="[^"]*image-bg[^"]*"[^>]*)\sstyle="display:\s*block;?"/gi,
  "$1",
);

const output = `<!-- Generated from legally-template.webflow.io — do not edit by hand; re-run scripts/process-webflow.mjs -->
<style id="webflow-global-embed">${globalStyles}</style>
<div class="main-wrapper">${processed}</div>
`;

fs.writeFileSync(outHtml, output);
console.log(`Wrote ${outHtml} (${(output.length / 1024).toFixed(0)} KB)`);

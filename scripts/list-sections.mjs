import fs from "node:fs";

const h = fs.readFileSync("src/webflow/markup.html", "utf8");
const classes = new Set();
for (const m of h.matchAll(/class="([^"]+)"/g)) {
  for (const c of m[1].split(/\s+/)) {
    if (c.includes("section") || c.includes("marquee") || c.includes("team")) {
      classes.add(c);
    }
  }
}
console.log([...classes].sort().join("\n"));

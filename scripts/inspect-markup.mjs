import fs from "node:fs";

const h = fs.readFileSync("src/webflow/markup.html", "utf8");
for (const key of [
  "section_services",
  "section_contact",
  "section_team",
  "section_start",
  "w-tabs",
  "w-slider",
  "marquee",
  "loop",
]) {
  const i = h.indexOf(key);
  if (i >= 0) console.log(key, "at", i, "...", h.slice(i, i + 120).replace(/\s+/g, " "));
}

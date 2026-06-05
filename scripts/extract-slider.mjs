import fs from "node:fs";

const h = fs.readFileSync("src/webflow/markup.html", "utf8");
const i = h.indexOf('class="slider w-slider"');
console.log(h.slice(i, i + 6000));

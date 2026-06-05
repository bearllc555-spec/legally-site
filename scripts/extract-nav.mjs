import fs from "node:fs";

const h = fs.readFileSync("src/webflow/markup.html", "utf8");
const i = h.indexOf('class="navbar w-nav"');
console.log(h.slice(i, i + 3500));

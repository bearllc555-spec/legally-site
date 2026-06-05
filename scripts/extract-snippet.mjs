import fs from "node:fs";

const h = fs.readFileSync("src/webflow/markup.html", "utf8");
const keys = ["loop_component", "w-tabs", "w-slider"];
for (const key of keys) {
  const i = h.indexOf(key);
  console.log("\n===", key, "===\n");
  console.log(h.slice(i - 80, i + 2500));
}

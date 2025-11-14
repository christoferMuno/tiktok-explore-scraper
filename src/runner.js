import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseExplorePage } from "./extractors/explore_parser.js";
import { exportData } from "./outputs/exporter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadInputs() {
const filePath = path.join(__dirname, "..", "data", "inputs.sample.txt");
if (!fs.existsSync(filePath)) {
console.error("Input file not found:", filePath);
process.exit(1);
}
const lines = fs.readFileSync(filePath, "utf8").split("\n").map(a => a.trim()).filter(Boolean);
return lines;
}

async function fetchHTML(url) {
try {
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch ${url}`);
return await res.text();
} catch (err) {
console.error("Fetch error:", err.message);
return "";
}
}

async function main() {
console.log("Running TikTok Explore Scraper...");
const urls = await loadInputs();

const results = [];
for (const url of urls) {
console.log("Scraping:", url);
const html = await fetchHTML(url);
const parsed = parseExplorePage(html);
results.push(...parsed);
}

await exportData(results);
console.log("Scraping complete. Output saved.");
}

main().catch(err => console.error("Fatal error:", err));
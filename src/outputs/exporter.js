import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createObjectCsvWriter } from "csv-writer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function exportData(data) {
const outDir = path.join(__dirname, "..", "..", "data");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const jsonPath = path.join(outDir, "sample_output.json");
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");

const csvPath = path.join(outDir, "sample_output.csv");
const headers = Object.keys(data[0] || {}).map(key => ({ id: key, title: key }));

const writer = createObjectCsvWriter({
path: csvPath,
header: headers
});

await writer.writeRecords(data);
}
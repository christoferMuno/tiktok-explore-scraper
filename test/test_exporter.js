import { exportData } from "../src/outputs/exporter.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
const sample = [
{
url: "https://example.com",
coverImage: "",
text: "test",
diggs: 1,
shares: 1,
plays: 10,
comments: 0,
duration: 5,
authorName: "A",
authorNickname: "a",
authorVerified: false,
authorFans: 10,
musicName: "m",
musicAuthor: "ma",
musicOriginal: false,
musicId: "123",
videoDefinition: "720p",
videoFormat: "mp4",
height: 720,
width: 1280
}
];

await exportData(sample);

const outJson = path.join(__dirname, "..", "data", "sample_output.json");
if (!fs.existsSync(outJson)) {
console.error("❌ Export failed.");
process.exit(1);
}

console.log("✅ Export test passed.");
})();
import { extractMediaInfo } from "./utils_media.js";

/**
* Simplified parser that searches for JSON embedded in HTML.
* Real TikTok pages often include JSON in <script id="SIGI_STATE">.
*/
export function parseExplorePage(html) {
const results = [];

if (!html) return results;

const match = html.match(/<script[^>]*id="SIGI_STATE"[^>]*>(.*?)<\/script>/s);
if (!match) {
console.warn("No SIGI_STATE block found.");
return results;
}

let json;
try {
json = JSON.parse(match[1]);
} catch (err) {
console.error("Failed parsing SIGI_STATE JSON:", err.message);
return results;
}

const items = json.ItemList?.video || [];
for (const item of items) {
const mediaMeta = extractMediaInfo(item.video || {});
results.push({
url: item.shareUrl || "",
coverImage: item.video?.cover || "",
text: item.desc || "",
diggs: item.stats?.diggCount || 0,
shares: item.stats?.shareCount || 0,
plays: item.stats?.playCount || 0,
comments: item.stats?.commentCount || 0,
duration: item.video?.duration || 0,
authorName: item.author?.nickname || "",
authorNickname: item.author?.uniqueId || "",
authorVerified: item.author?.verified || false,
authorFans: item.authorStats?.followerCount || 0,
musicName: item.music?.title || "",
musicAuthor: item.music?.authorName || "",
musicOriginal: item.music?.original || false,
musicId: item.music?.id || "",
videoDefinition: mediaMeta.videoDefinition,
videoFormat: mediaMeta.videoFormat,
height: mediaMeta.height,
width: mediaMeta.width
});
}

return results;
}
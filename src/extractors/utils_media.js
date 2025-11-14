export function extractMediaInfo(video) {
  return {
    videoDefinition: video.definition || "unknown",
    videoFormat: video.format || "mp4",
    height: video.height || 0,
    width: video.width || 0
  };
}
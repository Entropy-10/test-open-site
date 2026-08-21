export function beatmapsetCoverUrl(beatmapsetId: number): string {
  return `https://assets.ppy.sh/beatmaps/${beatmapsetId}/covers/cover.jpg`
}

export function beatmapUrl(beatmapId: number): string {
  return `https://osu.ppy.sh/b/${beatmapId}`
}

import type { Map, Mod } from "~/lib/db/schema"

export const MOD_ORDER: Mod[] = ["LM", "NM", "HD", "HR", "DT", "TB"]

export interface ModPool {
  mod: Mod
  maps: Map[]
}

function slotNumber(slot: string) {
  return Number(slot.match(/\d+$/u)?.[0] ?? 0)
}

export function groupByMod(maps: Map[]): ModPool[] {
  return MOD_ORDER.map((mod) => ({
    mod,
    maps: maps
      .filter((map) => map.mod === mod)
      .toSorted((a, b) => slotNumber(a.slot) - slotNumber(b.slot))
  })).filter((pool) => pool.maps.length > 0)
}

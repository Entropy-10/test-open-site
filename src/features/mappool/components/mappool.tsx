import type { ReactNode } from "react"

import { MapInfo } from "./map-info"
import type { Map } from "~/lib/db/schema"

function ModPoolContainer({ children }: { children: ReactNode }) {
  return (
    <div className="padding flex flex-wrap justify-center gap-5 py-8">
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div className="flex flex-row-reverse">
      <div className="from-light-blue via-salmon h-[4px] w-[65%] bg-linear-to-l to-[#FDC094]" />
    </div>
  )
}

export function Mappool({ maps }: { maps: Map[] }) {
  if (!maps || maps.length === 0) return

  const sortedMaps = maps.toSorted(
    (a, b) => Number(a.slot.slice(-1)) - Number(b.slot.slice(-1))
  )

  return (
    <>
      <ModPoolContainer>
        {sortedMaps
          .filter((map) => map.mod === "LM")
          .map((map) => (
            <MapInfo key={map.beatmapId} map={map} />
          ))}
      </ModPoolContainer>

      <Divider />

      <ModPoolContainer>
        {sortedMaps
          .filter((map) => map.mod === "NM")
          .map((map) => (
            <MapInfo key={map.beatmapId} map={map} />
          ))}
      </ModPoolContainer>

      <Divider />

      <ModPoolContainer>
        {sortedMaps
          .filter((map) => map.mod === "HD")
          .map((map) => (
            <MapInfo key={map.beatmapId} map={map} />
          ))}
      </ModPoolContainer>

      <Divider />

      <ModPoolContainer>
        {sortedMaps
          .filter((map) => map.mod === "HR")
          .map((map) => (
            <MapInfo key={map.beatmapId} map={map} />
          ))}
      </ModPoolContainer>

      <Divider />

      <ModPoolContainer>
        {sortedMaps
          .filter((map) => map.mod === "DT")
          .map((map) => (
            <MapInfo key={map.beatmapId} map={map} />
          ))}
      </ModPoolContainer>

      {sortedMaps.some((map) => map.mod === "TB") && (
        <>
          <Divider />

          <ModPoolContainer>
            {sortedMaps
              .filter((map) => map.mod === "TB")
              .map((map) => (
                <MapInfo key={map.beatmapId} map={map} />
              ))}
          </ModPoolContainer>
        </>
      )}
    </>
  )
}

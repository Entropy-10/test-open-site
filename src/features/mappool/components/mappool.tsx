import { Fragment } from "react"

import { MapInfo } from "./map-info"
import type { ModPool } from "~/utils/mods"

function Divider() {
  return (
    <div className="flex flex-row-reverse">
      <div className="from-light-blue via-salmon h-[4px] w-[65%] bg-linear-to-l to-[#FDC094]" />
    </div>
  )
}

export function Mappool({ pools }: { pools: ModPool[] }) {
  return pools.map((pool, index) => (
    <Fragment key={pool.mod}>
      {index > 0 && <Divider />}
      <div className="padding flex flex-wrap justify-center gap-5 py-8">
        {pool.maps.map((map) => (
          <MapInfo key={map.beatmapId} map={map} />
        ))}
      </div>
    </Fragment>
  ))
}

import { notFound } from "next/navigation"

import { getMappoolWithMaps } from "../mappool-queries"
import { Mappool } from "./mappool"
import { PoolSelector } from "./pool-selector"
import { Button } from "~/components/ui/button"
import { Link } from "~/i18n/navigation"
import type { Round } from "~/lib/db/schema"

export async function MappoolContainer({ round }: { round: Round }) {
  const mappool = await getMappoolWithMaps(round)
  if (!mappool) notFound()

  return (
    <div>
      <div className="absolute top-[84px] right-0 md:top-[100px]">
        {mappool.mappack && (
          <Button
            nativeButton={false}
            render={
              <Link href={mappool.mappack} target="_blank">
                DOWNLOAD MAPPACK
              </Link>
            }
          />
        )}
      </div>

      <PoolSelector />

      <Mappool maps={mappool.maps} />
    </div>
  )
}

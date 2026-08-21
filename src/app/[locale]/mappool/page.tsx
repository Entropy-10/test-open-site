import { Suspense } from "react"

import { Mappools } from "~/features/mappool/components/mappools"

export default function MappoolPage() {
  return (
    <div>
      Mappool
      <Suspense>
        <Mappools />
      </Suspense>
    </div>
  )
}

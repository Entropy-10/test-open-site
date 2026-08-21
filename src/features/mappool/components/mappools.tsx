import { getMappoolsWithMaps } from "../mappool-queries"

export async function Mappools() {
  const mappools = await getMappoolsWithMaps("grand_finals")

  return (
    <div>
      {mappools.map((mappool) => (
        <div key={mappool.id}>
          {mappool.round}
          <div>
            {mappool.maps.map((map) => (
              <div key={map.id}>{map.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

import { useSyncExternalStore } from "react"

export function useSizeQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const queryList = window.matchMedia(query)
      queryList.addEventListener("change", onStoreChange)

      return () => {
        queryList.removeEventListener("change", onStoreChange)
      }
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

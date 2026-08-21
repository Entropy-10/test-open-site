import { useEffect, useState } from "react"

export function useSizeQuery(query: string) {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const queryList = window.matchMedia(query)
    // oxlint-disable-next-line react/set-state-in-effect
    setMatch(queryList.matches)

    const changeHandler = ({ matches }: MediaQueryListEvent) => {
      setMatch(matches)
    }

    queryList.addEventListener("change", changeHandler)

    return () => {
      queryList.removeEventListener("change", changeHandler)
    }
  }, [query])

  return match
}

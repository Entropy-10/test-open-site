import { useEffect, useState } from "react"

export function useSizeQuery(query: string) {
  const [match, setMatch] = useState(false)

  const changeHandler = ({ matches }: MediaQueryListEvent) => {
    setMatch(matches)
  }

  useEffect(() => {
    const queryList = window.matchMedia(query)
    // oxlint-disable-next-line react/react-compiler
    setMatch(queryList.matches)

    queryList.addEventListener("change", changeHandler)

    return () => {
      queryList.removeEventListener("change", changeHandler)
    }
  }, [query])

  return match
}

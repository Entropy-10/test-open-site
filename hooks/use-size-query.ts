import { useEffect, useState } from 'react'

export default function useSizeQuery(query: string) {
	const [match, setMatch] = useState(false)

	useEffect(() => {
		const queryList = window.matchMedia(query)
		setMatch(queryList.matches)

		queryList.addEventListener('change', ({ matches }) => {
			setMatch(matches)
		})
	}, [query])

	return match
}

'use client'

import { useRouter } from '@navigation'

import type { ExtendedDocument } from '@types'

export default function useAnimatedRouter() {
	const router = useRouter()

	return (url: string, locale?: string) => {
		const extendedDocument = document as ExtendedDocument
		if (!extendedDocument.startViewTransition) {
			return router.push(url, { locale })
		}
		extendedDocument.startViewTransition(() => {
			router.push(url)
		})
	}
}

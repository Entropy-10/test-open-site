import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

export const inter = Inter({ subsets: ['latin'] })

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getBaseUrl() {
	if (isProd) return 'https://test-open.com'
	if (process.env.NEXT_PUBLIC_VERCEL_URL)
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	return `http://localhost:${process.env.PORT ?? 3000}`
}

export function pad(number: number) {
	return String(number).padStart(2, '0')
}

export function blobToBase64(blob: Blob) {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.readAsDataURL(blob)
	})
}

export function getFlagPathFromUrl(url: string) {
	const matches = url.match(/\/flags\/(.*?)\/(flag-\d+\.(?:jpeg|gif))/)
	if (!matches) return null
	return {
		folder: matches[1],
		filename: matches[2]
	}
}

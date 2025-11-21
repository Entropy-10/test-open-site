import { Inter } from 'next/font/google'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

export const inter = Inter({ subsets: ['latin'] })

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getBaseUrl() {
	const prodUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
	const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
	if (prodUrl) return `https://${prodUrl}`
	if (vercelUrl) return `https://${vercelUrl}`
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

import { getBaseUrl } from '@utils/client'

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: getBaseUrl(),
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: `${getBaseUrl()}/info`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7
		},
		{
			url: `${getBaseUrl()}/mappool`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9
		},
		{
			url: `${getBaseUrl()}/teams`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8
		},
		{
			url: `${getBaseUrl()}/schedule`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9
		}
	]
}

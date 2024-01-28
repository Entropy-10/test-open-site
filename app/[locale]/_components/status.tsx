import { env } from '@env'
import { StatusColor } from '@types'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import StatusIcon from '~/components/icons/status'

import type { UptimeStatusPage } from '@types'

export default async function Status() {
	const t = await getTranslations('Status')
	const pageId = env.NEXT_PUBLIC_STATUS_PAGE_ID
	const apiURL = env.NEXT_PUBLIC_UPTIME_API_URL

	const response = await fetch(`${apiURL}/status-pages/${pageId}`, {
		headers: { Authorization: `Bearer ${env.UPTIME_API_KEY}` }
	})

	const { data } = (await response.json()) as { data: UptimeStatusPage }
	if (!data) return null

	const status = data.attributes.aggregate_state
	const color = StatusColor[status]
	const text = t(status)

	return (
		<Link
			className='flex items-center gap-2 rounded px-2 py-1 hover:bg-blue/30'
			href='https://status.test-open.com'
			target='_blank'
		>
			<StatusIcon style={{ color }} />
			<span className='font-medium text-[14px] text-milky-white'>{text}</span>
		</Link>
	)
}

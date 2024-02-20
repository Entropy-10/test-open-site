import './env.mjs'

import nextIntl from 'next-intl/plugin'

const withNextIntl = nextIntl('./i18n.ts')

export default withNextIntl({
	experimental: {
		mdxRs: true,
		serverActions: { bodySizeLimit: '5mb' },
		esmExternals: 'loose'
	},
	pageExtensions: ['mdx', 'ts', 'tsx'],
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'a.ppy.sh' },
			{ protocol: 'https', hostname: 'cdn.discordapp.com' },
			{ protocol: 'https', hostname: 'flagsapi.com' },
			{ protocol: 'https', hostname: 'dtoyeiqtecliyympsgji.supabase.co' },
			{ protocol: 'https', hostname: 'avxmlbhyydzgmiwadyja.supabase.co' }
		]
	}
})

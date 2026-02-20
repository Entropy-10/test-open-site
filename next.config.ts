import './src/env'

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
	reactCompiler: true,
	experimental: {
		mdxRs: true,
		serverActions: { bodySizeLimit: '5mb' },
		turbopackFileSystemCacheForDev: true
	},
	transpilePackages: ['next-mdx-remote'],
	pageExtensions: ['mdx', 'ts', 'tsx'],
	images: {
		qualities: [100, 75],
		remotePatterns: [
			{ protocol: 'https', hostname: 'a.ppy.sh' },
			{ protocol: 'https', hostname: 'assets.ppy.sh' },
			{ protocol: 'https', hostname: 'osu.ppy.sh' },
			{ protocol: 'https', hostname: 'cdn.discordapp.com' },
			{ protocol: 'https', hostname: 'flagsapi.com' },
			{ protocol: 'https', hostname: 'dtoyeiqtecliyympsgji.supabase.co' },
			{ protocol: 'https', hostname: 'avxmlbhyydzgmiwadyja.supabase.co' }
		]
	}
})

import './env.mjs'

import nextIntl from 'next-intl/plugin'

const withNextIntl = nextIntl('./i18n.ts')

export default withNextIntl({
  experimental: { mdxRs: true },
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'a.ppy.sh' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'flagsapi.com' },
      { protocol: 'https', hostname: 'dtoyeiqtecliyympsgji.supabase.co' }
    ]
  },
  logging: { fetches: { fullUrl: true } }
})

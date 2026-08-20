import type { NextConfig } from "next"

import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    globalNotFound: true,
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true
  }
}

const withVarlock = varlockNextConfigPlugin()
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withVarlock(withNextIntl(nextConfig))

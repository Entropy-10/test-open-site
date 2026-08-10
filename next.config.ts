import type { NextConfig } from "next"

import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true
  }
}

const withVarlock = varlockNextConfigPlugin()
const withNextIntl = createNextIntlPlugin()

export default withVarlock(withNextIntl(nextConfig))

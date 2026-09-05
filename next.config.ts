import type { NextConfig } from "next"

import createMDX from "@next/mdx"
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
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { hostname: "a.ppy.sh" },
      { hostname: "assets.ppy.sh" },
      { hostname: "dtoyeiqtecliyympsgji.supabase.co" }
    ]
  }
}

const withMDX = createMDX()
const withVarlock = varlockNextConfigPlugin()
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withVarlock(withMDX(withNextIntl(nextConfig)))

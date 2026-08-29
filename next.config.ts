import type { NextConfig } from "next"

import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin"
import createNextIntlPlugin from "next-intl/plugin"

const stylexLoader = {
  loader: "@stylexswc/turbopack-plugin/loader",
  options: {
    rsOptions: {
      dev: process.env.NODE_ENV !== "production",
      runtimeInjection: false,
      treeshakeCompensation: true,
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: process.cwd()
      }
    }
  }
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    globalNotFound: true,
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true
  },
  images: { remotePatterns: [{ hostname: "assets.ppy.sh" }] },
  turbopack: {
    rules: {
      "*.tsx": { loaders: [stylexLoader] },
      "*.ts": { loaders: [stylexLoader] }
    }
  }
}

const withVarlock = varlockNextConfigPlugin()
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withVarlock(withNextIntl(nextConfig))

import { ENV } from "varlock/env"

export function getBaseUrl() {
  const prodUrl = ENV.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  const vercelUrl = ENV.NEXT_PUBLIC_VERCEL_URL
  if (prodUrl) return `https://${prodUrl}`
  if (vercelUrl) return `https://${vercelUrl}`
  return `https://test-open.localhost`
}

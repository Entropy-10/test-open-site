export function getBaseUrl() {
  const prodUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  if (prodUrl) return `https://${prodUrl}`
  if (vercelUrl) return `https://${vercelUrl}`
  return `https://test-open.localhost`
}

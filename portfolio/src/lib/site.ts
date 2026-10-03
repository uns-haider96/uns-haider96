// Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain
// exists; otherwise Vercel's production URL is used, then localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

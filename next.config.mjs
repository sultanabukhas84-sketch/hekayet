import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
      handler: "NetworkFirst",
      options: { cacheName: "firestore-cache", networkTimeoutSeconds: 4 }
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: { cacheName: "google-fonts", expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } }
    },
    {
      urlPattern: /^https:\/\/pagead2\.googlesyndication\.com\/.*/i,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "adsense" }
    }
  ]
})({
  reactStrictMode: true,
  images: { remotePatterns: [] },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
});

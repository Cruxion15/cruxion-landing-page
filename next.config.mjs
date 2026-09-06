/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Certificate verification lives in the platform app, but its URL is
        // printed on certificates and scanned by people who have never heard
        // of us — so it goes out on the brand domain, not an "app." subdomain
        // that reads as "log in here".
        //
        // A redirect rather than a rewrite, deliberately: a rewrite proxies the
        // app's HTML through this origin, so its /_next/static/* assets would be
        // requested from cruxion.in and 404 against this build. Making that work
        // needs an assetPrefix on the platform app plus a CSP here widened to
        // allow scripts and styles from app.cruxion.in — a real weakening of
        // this site's headers for a cosmetic gain in the address bar.
        source: "/verify/:code",
        destination: "https://app.cruxion.in/verify/:code",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://api.resend.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

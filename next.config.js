/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),

  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Optimize images for SEO
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression for better performance
  compress: true,

  // Optimize CSS and packages
  experimental: {
    optimizePackageImports: [
      "@heroui/system",
      "@heroui/theme",
      "react-icons",
      "devicon",
    ],
    // optimizeCss: true, // Disabled due to critters module issue
  },

  // Production source maps (disable for smaller builds)
  productionBrowserSourceMaps: false,

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce client-side bundle size
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;

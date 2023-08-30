const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // swcPlugins: [
    //   [
    //     "@formatjs/swc-plugin-experimental",
    //     {
    //       ast: true,
    //       idInterpolationPattern: "[sha512:contenthash:base64:6]",
    //     },
    //   ],
    // ],
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          has: [
            {
              type: "host",
              value: "(?<host>.*)",
            },
          ],
          source: "/en/:path*",
          destination: "/:host/en/:path*",
        },
        {
          has: [
            {
              type: "host",
              value: "(?<host>.*)",
            },
          ],
          source: "/zh/:path*",
          destination: "/:host/zh/:path*",
        },
      ],
    };
  },
  modularizeImports: {
    // Web layer
    "@easybiz/web-checkout": {
      transform: "@easybiz/web-checkout/src/{{member}}",
    },
    "@easybiz/web-component": {
      transform: "@easybiz/web-component/src/{{member}}",
    },
    "@easybiz/web-email": {
      transform: "@easybiz/web-email/src/{{member}}",
    },
    "@easybiz/web-ui": {
      transform: "@easybiz/web-ui/src/{{member}}",
    },
    // API layer
    "@easybiz/api-chat": {
      transform: "@easybiz/api-chat/src/{{member}}",
    },
    "@easybiz/api-customer": {
      transform: "@easybiz/api-customer/src/{{member}}",
    },
    "@easybiz/api-job": {
      transform: "@easybiz/api-job/src/{{member}}",
    },
    "@easybiz/api-order": {
      transform: "@easybiz/api-order/src/{{member}}",
    },
    // abs layer
    "@easybiz/checkout": {
      transform: "@easybiz/checkout/src/{{member}}",
    },
    "@easybiz/component": {
      transform: "@easybiz/component/src/{{member}}",
    },
    "@easybiz/hook": {
      transform: "@easybiz/hook/src/{{member}}",
    },
  },
  transpilePackages: [
    "@easybiz/web-component",
    "@easybiz/web-ui",
    "@easybiz/web-checkout",
    "@easybiz/web-email",
    "@easybiz/api-chat",
    "@easybiz/api-customer",
    "@easybiz/api-job",
    "@easybiz/api-order",
    "@easybiz/checkout",
    "@easybiz/component",
    "@easybiz/hook",
  ],
};

module.exports = withBundleAnalyzer(nextConfig);

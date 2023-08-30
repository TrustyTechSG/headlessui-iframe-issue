/** @type {import('next').NextConfig} */
const nextConfig = {
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
          source: "/:path*",
          destination: "/:host/:path*",
        }
      ],
    };
  },
}

module.exports = nextConfig

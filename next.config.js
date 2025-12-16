/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      // https://nextjs.org/docs/app/api-reference/next-config-js/turbopack#root-directory
      // This is the directory that Turbopack will use as the root of your project.
      // It is used to resolve modules and other files.
      // We set it to the current directory to avoid issues with multiple lockfiles.
      root: __dirname,
    },
  },
};

module.exports = nextConfig;

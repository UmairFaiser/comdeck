export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.comdeck.vercel.app/sitemap.xml",
  };
}

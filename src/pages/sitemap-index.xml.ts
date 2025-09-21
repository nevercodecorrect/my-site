import type { APIRoute } from "astro";
import { SITE } from "@config";

// Get all static pages (excluding 404, dynamic, and API routes)
const staticPages = Object.keys(
  import.meta.glob([
    "../pages/**/*.astro",
    "../pages/**/*.md",
    "!../pages/404.astro",
    "!../pages/**/[...*].astro",
    "!../pages/**/[slug]*/**",
    "!../pages/**/*.png.ts",
    "!../pages/**/*.xml.ts",
    "!../pages/**/*.txt.ts",
  ], { eager: true })
)
  .map((file) =>
    file
      .replace("../pages", "")
      .replace(/index\.(astro|md)$/, "/")
      .replace(/\.(astro|md)$/, "")
  )
  .filter((url) => url !== "/");

// Get all blog posts
const blogPosts = Object.keys(
  import.meta.glob("../content/blog/*.md", { eager: true })
).map((file) =>
  file.replace("../content/blog/", "/posts/").replace(/\.md$/, "")
);

export const GET: APIRoute = async () => {
  const urls = ["/", ...staticPages, ...blogPosts];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${SITE.website.replace(/\/$/, "")}${url}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

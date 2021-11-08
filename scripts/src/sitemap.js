import { globby } from "globby";
import { writeFileSync } from "fs";
import prettier from "prettier";
import getImageMetadata from "./getImageMetadata.js";

const getDate = new Date().toISOString().slice(0, 10);
const DOMAIN_NAME = "https://kmin283.com";
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby([
    "../project/pages/**/*.tsx",
    "../project/pages/*.tsx",
    "!../project/pages/_*.tsx",
    "!../project/pages/[*.tsx",
    "!../project/pages/_blog-admin/**/*.tsx",
  ]);
  const markdowns = await globby(["../project/mds/*"]);
  const pageSitemap = `
  ${pages
    .map((page) => {
      const path = page
        .replace("../project/pages/", "")
        .replace(".tsx", "")
        .replace(/\/index/g, "");
      const routePath = path === "index" ? "" : path;
      return `
    <url>
    <loc>${DOMAIN_NAME}/${routePath}</loc>
    <lastmod>${getDate}</lastmod>
</url>`;
    })
    .join("")}`;

  const imageMetadata = await getImageMetadata();

  const markdownSitemap = `
  ${markdowns
    .map((markdown, index) => {
      const imageSitemap = `${imageMetadata[index]
        .map(({ alt, source, title }) => {
          return `<image:image>
      <image:loc>http://example.com${source}</image:loc>
      <image:caption>${alt}</image:caption>
      <image:title>${title}</image:title>
    </image:image>`;
        })
        .join("")}`;
      const path = markdown.replace("../project/mds/", "").replace(".md", "");
      return `<url>
      <loc>${DOMAIN_NAME}/${path}</loc>
      <lastmod>${getDate}</lastmod>
      ${imageSitemap}
    </url>`;
    })
    .join("")}`;

  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">>
    ${pageSitemap}
    ${markdownSitemap}
  </urlset>`;

  const formattedSitemap = formatted(generatedSitemap);
  writeFileSync("../project/public/sitemap.xml", formattedSitemap, "utf-8");
})();

import {globby} from "globby";
import {writeFileSync} from "fs";
import prettier from 'prettier';
import getImageMetadata from './getImageMetadata.js';

const getDate = new Date().toISOString().slice(0, 10);
const DOMAIN_NAME = "https://kmin.com";
const formatted = sitemap => prettier.format(sitemap, {parser: "html"});

(async () => {
  const pages = await globby([
    "../project/pages/**/*.tsx",
    "../project/pages/*.tsx",
    "!../project/pages/_*.tsx",
    "!../project/pages/[*.tsx",
    "!../project/pages/_blog-admin/**/*.tsx",
  ]);
  const markdowns = await globby(["../project/mds/*"]);
  //TODO http://localhost:3000 하드코딩 된 부분 나중에 도메인으로 변경
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
    <loc>http://localhost:3000/${routePath}</loc>
    <lastmod>${getDate}</lastmod>
</url>`;
    })
    .join("")}`;

  //TODO markdown 파일에 맞춰서 그 안에 <image태그를> url안에 넣어야 함.

  const imageMetadata = await getImageMetadata();

  const markdownSitemap = `
  ${markdowns.map((markdown, index) => {
    const imageSitemap = `${imageMetadata[index].map(({alt, source, title}) => {
      return `<image:image>
      <image:loc>http://example.com${source}</image:loc>
      <image:caption>${alt}</image:caption>
      <image:title>${title}</image:title>
    </image:image>`;
    }).join("")}`;
    const path = markdown.replace("../project/mds/", "").replace(".md", "");
    return `<url>
      <loc>http://localhost:3000/${path}</loc>
      <lastmod>${getDate}</lastmod>
      ${imageSitemap}
    </url>`;
  }).join("")}`;


  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pageSitemap}
    ${markdownSitemap}
  </urlset>`;

  const formattedSitemap = formatted(generatedSitemap);
  writeFileSync("../project/public/sitemap.xml", formattedSitemap, "utf-8");
})();

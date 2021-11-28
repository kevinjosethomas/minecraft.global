import { getServerSideSitemap } from "next-sitemap";

import tags from "lib/tags.json";
import { GetServers } from "api/server";

const Default = () => {};

export async function getServerSideProps(ctx) {
  const fields = [
    {
      loc: "https://minecraft.global",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/search",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/terms",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/privacy",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/premium",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/partners",
      lastmod: new Date().toISOString(),
    },
  ];

  for (const tag of tags) {
    fields.push({
      loc: `https://minecraft.global/tag/${encodeURIComponent(tag.name)}`,
      lastmod: new Date().toISOString(),
    });
  }

  const [servers, error] = await GetServers();

  if (error) {
    return getServerSideSitemap(ctx, fields);
  }

  for (const server of servers) {
    fields.push({
      loc: "https://minecraft.global/server/" + server[0],
      lastmod: server[1],
    });
  }

  return getServerSideSitemap(ctx, fields);
}

export default Default;

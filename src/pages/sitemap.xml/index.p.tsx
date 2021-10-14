import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap } from "next-sitemap";

import GetServers from "api/servers";

const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
      loc: "https://minecraft.global/advertise",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/privacy",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/terms",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/soon",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/partners",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/premium",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/support",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/auctions",
      lastmod: new Date().toISOString(),
    },
  ];

  const servers = await GetServers();

  for (const server of servers[0]) {
    fields.push({
      loc: "https://minecraft.global/server/" + server,
      lastmod: new Date().toISOString(),
    });
  }

  return getServerSideSitemap(ctx, fields);
};

export { getServerSideProps };

export default () => {};

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
      loc: "https://minecraft.global/login",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://minecraft.global/servers",
      lastmod: new Date().toISOString(),
    },
  ];

  const servers = await GetServers();

  for (const server of servers) {
    fields.push({
      loc: "https://minecraft.global/server/" + server,
      lastmod: new Date().toISOString(),
    });
  }

  return getServerSideSitemap(ctx, fields);
};

export { getServerSideProps };

export default () => {};

import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";

const getServerSideProps = async (ctx) => {
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

  const servers = (
    await axios.get(process.env.NEXT_PUBLIC_API_URL + "/servers")
  ).data.payload;

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

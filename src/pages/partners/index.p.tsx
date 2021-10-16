import Head from "next/head";
import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Partner from "./components/Partner";

type Partners = {
  user?: Record<string, any>;
};

function Partners(props: Partners) {
  const partners = [
    {
      name: "Starlight Capes",
      icon: "/images/partners/starlight_capes.png",
      href: "https://discord.gg/5tDyktNXNU",
      description:
        "Custom Capes program releasing soon! Paid custom (non)animated capes! Friendly and helpful staff. Looking for media and server partners!",
    },
    {
      name: "Villager Bot",
      icon: "/images/partners/villager_bot.png",
      href: "https://top.gg/bot/639498607632056321",
      description:
        "A Minecraft-themed Discord bot with economy, utility, fun, memes, moderation, and Minecraft commands and features! You name it? We got it! We also support multiple languages! Español! Français, Português!",
    },
  ];

  return (
    <Default background="bg-dark-700" user={props.user}>
      <Head>
        <title>Partners - minecraft.global</title>
        <meta name="title" content="Partners - minecraft.global" />
        <meta property="og:title" content="Partners - minecraft.global" />
        <meta property="twitter:title" content="Partners - minecraft.global" />
      </Head>
      <div className="flex flex-col items-start justify-center w-full space-y-6">
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold text-6xl text-gray-300">Partners</span>
          <span className="font-medium text-xl text-gray-400">
            Interested in a partnership?{" "}
            <a
              href="https://discord.minecraft.global/"
              className="underline"
              rel="noreferrer nofollow"
              target="_blank"
            >
              Join this list!
            </a>
          </span>
        </div>
        <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 w-full">
          {partners.map((partner, index) => (
            <Partner key={index} {...partner} />
          ))}
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
    };
  } else {
    return {
      props: {
        user: user.payload,
      },
    };
  }
}

export default Partners;

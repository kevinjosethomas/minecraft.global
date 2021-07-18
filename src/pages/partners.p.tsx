import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type Partners = {
  user?: object;
};

function Partners(props: Partners) {
  const partners = [
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
        <div className="grid grid-flow-row">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start w-80 md:w-100 h-92 md:h-87.5 p-6 space-y-6 bg-dark-600 border-2 border-gray-800 rounded"
            >
              <div className="flex flex-row items-center justify-start w-full space-x-4 overflow-x-hidden whitespace-nowrap">
                <img
                  src={partner.icon}
                  alt={partner.name}
                  className="w-16 h-16 min-w-[4rem] rounded"
                />
                <span className="font-bold text-5xl text-gray-300 tracking-tight">
                  {partner.name}
                </span>
              </div>
              <div className="flex flex-col items-start justify-start flex-1">
                <span className="font-medium text-gray-400">{partner.description}</span>
              </div>
              <a
                href={partner.href}
                rel="noreferrer nofollow"
                target="_blank"
                className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300"
              >
                <span className="font-medium text-gray-400 select-none">View {partner.name}</span>
              </a>
            </div>
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

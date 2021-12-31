import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

export default function Partners(props) {
  const partners = [
    {
      name: "Starlight Capes",
      icon: "/partners/starlight_capes.png",
      href: "https://discord.gg/5tDyktNXNU",
      description:
        "Custom Capes program releasing soon! Paid custom (non) animated capes! Friendly and helpful staff. Looking for media and server partners!",
    },
    {
      name: "Villager Bot",
      icon: "/partners/villager_bot.png",
      href: "https://top.gg/bot/639498607632056321",
      description:
        "A Minecraft-themed Discord bot with economy, utility, fun, memes, moderation, and Minecraft commands and features! You name it? We got it!",
    },
  ];

  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title="Partners - Minecraft Server List"
      search
    >
      <div className="flex flex-col items-start justify-start w-full space-y-2">
        <h1 className="font-bold text-6xl text-white text-opacity-90">Partners</h1>
        <div className="grid grid-cols-3 w-full">
          {partners.map((partner, index) => (
            <Partner key={index} {...partner} />
          ))}
        </div>
      </div>
    </Default>
  );
}

function Partner(props) {
  return (
    <div className="flex flex-col items-start justify-between w-96 h-[22rem] p-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <div className="flex flex-row items-center justify-start space-x-2">
          <img
            src={props.icon}
            alt={`${props.name}'s Logo`}
            draggable="false"
            className="w-16 h-16 rounded-lg"
          />
          <h2 className="font-medium text-3xl text-white text-opacity-80">{props.name}</h2>
        </div>
        <p className="text-lg text-white text-opacity-60">{props.description}</p>
      </div>
      <a
        className="flex flex-row items-center justify-center w-full py-4 bg-olive-930 hover:bg-olive-920 cursor-pointer rounded transition duration-300"
        rel="noreferrer nofollow"
        href={props.href}
        target="_blank"
      >
        <p className="text-xl text-white text-opacity-90 select-none">View {props.name}</p>
      </a>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data] = await Promise.all([GetLoggedInUser(ctx), GetDefaultData()]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          defaultResults: data[0],
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}

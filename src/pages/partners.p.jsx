import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";

export default function Partners(props) {
  const partners = [
    {
      name: "Villager Bot",
      icon: "/partners/villager_bot.png",
      href: "https://top.gg/bot/639498607632056321",
      description:
        "A Minecraft-themed Discord bot with economy, utility, fun, memes, moderation, and Minecraft commands and features! You name it? We got it!",
    },
  ];

  return (
    <Default user={props.user} title="Partners - Minecraft Server List" search>
      <div className="flex w-full flex-col items-start justify-start space-y-2">
        <h1 className="text-6xl font-bold text-white text-opacity-90">
          Partners
        </h1>
        <div className="grid w-full grid-cols-3">
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
    <div className="flex h-[22rem] w-96 flex-col items-start justify-between rounded-lg border-2 border-olive-930 bg-olive-950 p-4">
      <div className="flex w-full flex-col items-start justify-start space-y-4">
        <div className="flex items-center justify-start space-x-2">
          <img
            src={props.icon}
            alt={`${props.name}'s Logo`}
            draggable="false"
            className="h-16 w-16 rounded-lg"
          />
          <h2 className="text-3xl font-medium text-white text-opacity-80">
            {props.name}
          </h2>
        </div>
        <p className="text-lg text-white text-opacity-60">
          {props.description}
        </p>
      </div>
      <a
        className="flex w-full cursor-pointer items-center justify-center rounded bg-olive-930 py-4 transition duration-300 hover:bg-olive-920"
        rel="noreferrer nofollow"
        href={props.href}
        target="_blank"
      >
        <p className="select-none text-xl text-white text-opacity-90">
          View {props.name}
        </p>
      </a>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [response, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        props: {},
      };
    } else {
      return {
        props: {
          user: response,
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

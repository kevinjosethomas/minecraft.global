import Link from "next/link";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";

export default function Advertise(props) {
  return (
    <Default user={props.user} title="Advertise - Minecraft Server List">
      <div className="flex w-full flex-col space-y-4">
        <h1 className="text-5xl font-medium tracking-tight text-white">
          Advertise on minecraft.global
        </h1>
        <div className="flex w-full flex-col space-y-5">
          <Link href="/a/dashboard">
            <a className="flex w-full items-center justify-center rounded-lg border-2 border-olive-900 bg-olive-910 py-2 transition duration-300 hover:bg-olive-900">
              <p className="select-none text-xl text-white md:text-2xl">
                View Advertising Dashboard
              </p>
            </a>
          </Link>
          <div className="grid w-full gap-y-5 md:grid-cols-2 md:gap-y-0 md:gap-x-5">
            <Banners />
            <Auctions />
          </div>
        </div>
      </div>
    </Default>
  );
}

function Banners() {
  const info = [
    "Fixed pricing every week",
    "2 site-wide advertising slots",
    "Advertisements rotate weekly",
    "Displayed via a banner image",
    "Links to an external website",
    "Price range: $10-$15 weekly",
  ];

  return (
    <div className="bg-opacity- flex flex-col items-center justify-start rounded-lg border-2 border-olive-930 bg-olive-950 transition duration-300">
      <div className="flex w-full flex-col items-center justify-start space-y-5 border-b-2 border-olive-930 bg-black bg-opacity-20 p-6">
        <img
          src="/images/illustrations/wandering-trader.png"
          draggable="false"
          alt="Wandering Trader"
          className="h-64"
        />
        <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
          Banner Advertisements
        </h2>
      </div>
      <div className="flex w-full  flex-col items-start justify-start space-y-6 p-6">
        <ul className="list-inside list-disc space-y-1">
          {info.map((i, index) => (
            <li
              key={index}
              className="text-lg font-light text-white text-opacity-80 md:text-2xl"
            >
              {i}
            </li>
          ))}
        </ul>
        <Link href="/a/banner">
          <a className="flex w-full flex-row items-center justify-center rounded bg-olive-910 py-2 transition duration-300 hover:bg-olive-900">
            <p className="select-none text-2xl text-white text-opacity-90">
              Check it out
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
}

function Auctions() {
  const info = [
    "Varying pricing every week",
    "41 site-wide advertising slots",
    "Advertisements rotate weekly",
    "Displayed as a highlighted server",
    "Links to your server's minecraft.global page",
    "Price range: $50+ weekly",
  ];

  return (
    <div className="bg-opacity- flex flex-col items-center justify-start rounded-lg border-2 border-olive-930 bg-olive-950 transition duration-300">
      <div className="flex w-full flex-col items-center justify-start space-y-5 border-b-2 border-olive-930 bg-black bg-opacity-20 p-6">
        <img
          src="/images/illustrations/auction-traders.png"
          draggable="false"
          alt="Wandering Trader"
          className="h-64"
        />
        <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
          Auction Advertisements
        </h2>
      </div>
      <div className="flex w-full flex-col items-start justify-start space-y-6 p-6">
        <ul className="list-inside list-disc space-y-1">
          {info.map((i, index) => (
            <li
              key={index}
              className="text-lg font-light text-white text-opacity-80 md:text-2xl"
            >
              {i}
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-row items-center justify-center rounded bg-olive-930 py-2 transition duration-300">
          <p className="select-none text-2xl text-white text-opacity-90">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = await GetLoggedInUser(ctx);

    if (user[1]) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          user: user[0],
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

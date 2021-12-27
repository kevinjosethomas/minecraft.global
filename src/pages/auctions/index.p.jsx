import { useState, Fragment } from "react";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import AuctionsScreen from "./screens/Auctions";
import Navigation from "./components/Navigation";

const screens = [
  {
    name: "information",
    label: "Information",
    icon: "far fa-info-circle",
  },
  {
    name: "auctions",
    label: "Auctions",
    icon: "far fa-badge-dollar",
  },
];

export default function Auctions(props) {
  const [screen, setScreen] = useState(screens[1]);

  return (
    <Default user={props.user}>
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <Navigation screen={screen} screens={screens} setScreen={setScreen} />
        {screen.name === "auctions" ? <AuctionsScreen user={props.user} /> : <Fragment />}
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = await GetLoggedInUser(ctx);

    if (user[1]) {
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }

    return {
      props: {
        user: user[0],
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}

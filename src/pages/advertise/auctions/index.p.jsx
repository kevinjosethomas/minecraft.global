import { useState, Fragment } from "react";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import Bidding from "./screens/Bidding/Bidding";
import Navigation from "./components/Navigation";

const screens = [
  {
    name: "information",
    label: "Information",
    icon: "far fa-info-circle",
  },
  {
    name: "bidding",
    label: "Bidding",
    icon: "far fa-badge-dollar",
  },
];

export default function Auctions(props) {
  const [screen, setScreen] = useState(screens[1]);

  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col items-start justify-start space-y-6">
        <Navigation screen={screen} screens={screens} setScreen={setScreen} />
        {screen.name === "bidding" ? (
          <Bidding user={props.user} />
        ) : (
          <Fragment />
        )}
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = await GetLoggedInUser(ctx, true);

    if (user[1]) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
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

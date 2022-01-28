import { Fragment, useState } from "react";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import Navigation from "./components/Navigation";
import Information from "./screens/Information/Information";

const screens = [
  {
    name: "information",
    label: "Information",
    icon: "far fa-info-circle",
  },
  {
    name: "products",
    label: "Products",
    icon: "far fa-box-open",
  },
  {
    name: "purchase",
    label: "Purchase",
    icon: "far fa-badge-dollar",
  },
];

export default function Banner(props) {
  const [screen, setScreen] = useState(screens[0]);

  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-8">
        <h1 className="text-5xl font-medium tracking-tight text-white">
          Banner Advertising
        </h1>
        <div className="flex flex-col space-y-4">
          <Navigation screens={screens} screen={screen} setScreen={setScreen} />
          {screen.name === "information" ? (
            <Information screens={screens} setScreen={setScreen} />
          ) : (
            <Fragment />
          )}
        </div>
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

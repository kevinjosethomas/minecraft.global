import { Fragment, useState } from "react";

import Details from "./screens/Details";
import Default from "ui/layouts/Default";
import Features from "./screens/Features";
import Votifier from "./screens/Votifier";
import { GetLoggedInUser } from "api/login";
import Description from "./screens/Description";
import Navigation from "./components/Navigation";

export default function AddServer(props) {
  const screens = [
    {
      name: "details",
      label: "Details",
      icon: "far fa-pencil-paintbrush",
    },
    {
      name: "features",
      label: "Features",
      icon: "far fa-list",
    },
    {
      name: "description",
      label: "Description",
      icon: "far fa-align-left",
    },
    {
      name: "votifier",
      label: "Votifier",
      icon: "far fa-bell",
    },
    // {
    //   name: "rcon",
    //   label: "RCON Console",
    //   icon: "far fa-tools",
    // },
  ];
  const [screen, setScreen] = useState(screens[0]);

  const [details, setDetails] = useState({
    name: "",
    host: "",
    description: "",
    tags: [],
    whitelisted: false,
    bedrock: false,
    cracked: false,
    website_url: "",
    discord_url: "",
    trailer_url: "",
    long_description: "",
    votifier: {
      votifier_host: "",
      votifier_port: "",
      votifier_token: "",
    },
  });

  return (
    <Default user={props.user} defaultResults={props.defaultResults}>
      <div className="flex flex-row items-start justify-start w-full space-x-6">
        <Navigation screen={screen} screens={screens} setScreen={setScreen} />
        <div className="flex flex-col items-start justify-start w-full p-8 space-y-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
          {screen.name != "delete" && (
            <div className="flex flex-row items-center justify-start w-full">
              <h1 className="font-medium text-4xl text-white text-opacity-90">{screen.label}</h1>
            </div>
          )}
          {screen.name === "details" ? (
            <Details details={details} setDetails={setDetails} />
          ) : screen.name === "features" ? (
            <Features details={details} setDetails={setDetails} />
          ) : screen.name === "description" ? (
            <Description details={details} setDetails={setDetails} />
          ) : screen.name === "votifier" ? (
            <Votifier details={details} setDetails={setDetails} />
          ) : (
            <></>
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

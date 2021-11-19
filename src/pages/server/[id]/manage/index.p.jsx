import Cookies from "cookies";
import { useState } from "react";

import Delete from "./screens/Delete";
import Details from "./screens/Details";
import Default from "ui/layouts/Default";
import Webhooks from "./screens/Webhooks";
import { GetDefaultData } from "api/core";
import Votifier from "./screens/Votifier";
import Analytics from "./screens/Analytics";
import { GetLoggedInUser } from "api/login";
import { GetEditServerByID } from "api/server";
import Navigation from "./components/Navigation";

export default function ManageServer(props) {
  const screens = [
    {
      name: "details",
      label: "Details",
      icon: "far fa-pencil-paintbrush",
    },
    {
      name: "votifier",
      label: "Votifier",
      icon: "far fa-bell",
    },
    {
      name: "analytics",
      label: "Analytics",
      icon: "far fa-poll",
    },
    {
      name: "webhooks",
      label: "Webhooks",
      icon: "fab fa-discord",
    },
    // {
    //   name: "rcon",
    //   label: "RCON Console",
    //   icon: "far fa-tools",
    // },
    {
      name: "delete",
      label: "Delete",
      icon: "far fa-trash-alt",
    },
  ];

  const [screen, setScreen] = useState(screens[0]);
  const [details, setDetails] = useState({
    name: props.server.name,
    host: props.server.host + (props.server.port ? `:${props.server.port}` : ""),
    description: props.server.description,
    tags: [...props.server.tags],
    whitelisted: props.server.whitelisted,
    bedrock: props.server.bedrock,
    cracked: props.server.cracked,
    website_url: props.server.website_url || "",
    discord_url: props.server.discord_url || "",
    trailer_url: props.server.trailer_url || "",
    long_description: props.server.long_description,
    dsc_webhook_url: props.server.dsc_webhook_url || "",
    dsc_webhook_msg: props.server.dsc_webhook_msg || "",
    votifier: {
      votifier_host: props.server.votifier_host || "",
      votifier_port: props.server.votifier_port || "",
      votifier_token: props.server.votifier_token || "",
    },
  });

  return (
    <Default user={props.user}>
      <div className="flex flex-row items-start justify-start w-full space-x-6">
        <Navigation
          screen={screen}
          screens={screens}
          setScreen={setScreen}
          name={props.server.name}
          favicon={props.server.favicon}
        />
        <div className="flex flex-col items-start justify-start w-full p-8 space-y-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
          {screen.name != "delete" && (
            <div className="flex flex-row items-center justify-start w-full">
              <h1 className="font-medium text-4xl text-white text-opacity-90">{screen.label}</h1>
            </div>
          )}
          {screen.name === "details" ? (
            <Details details={details} setDetails={setDetails} />
          ) : screen.name === "votifier" ? (
            <Votifier details={details} setDetails={setDetails} />
          ) : screen.name === "analytics" ? (
            <Analytics />
          ) : screen.name === "webhooks" ? (
            <Webhooks details={details} setDetails={setDetails} />
          ) : screen.name === "delete" ? (
            <Delete />
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
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    const responses = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(ctx),
      GetEditServerByID(ctx.params.id, token),
    ]);

    const user = responses[0];
    const data = responses[1];
    const server = responses[2];

    if (user[1]) {
      return {
        props: {
          error: user[1].response?.status || 500,
        },
      };
    }

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (server[1]) {
      return {
        props: {
          error: server[1].response?.status || 500,
        },
      };
    }

    return {
      props: {
        user: user[0],
        server: server[0],
        defaultResults: data[0],
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

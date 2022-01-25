import Head from "next/head";
import Cookies from "cookies";
import cookie from "js-cookie";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";

import validate from "lib/validate";
import Delete from "./screens/Delete";
import Details from "./screens/Details";
import Billing from "./screens/Billing";
import Default from "ui/layouts/Default";
import Webhooks from "./screens/Webhooks";
import Votifier from "./screens/Votifier";
import Analytics from "./screens/Analytics";
import { GetLoggedInUser } from "api/login";
import Navigation from "./components/Navigation";
import { EditServer, FetchServer, FetchServerTransactions } from "api/server";

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
    {
      name: "billing",
      label: "Billing",
      icon: "far fa-badge-dollar",
    },
    {
      name: "delete",
      label: "Delete",
      icon: "far fa-trash-alt",
    },
  ];

  const [screen, setScreen] = useState(screens[0]);
  const [details, setDetails] = useState({
    name: props.server.name,
    host:
      props.server.host + (props.server.port ? `:${props.server.port}` : ""),
    vanity: props.server.vanity || "",
    description: props.server.description,
    tags: [...props.server.tags],
    whitelisted: props.server.whitelisted,
    bedrock: props.server.bedrock,
    supports_bedrock: props.server.supports_bedrock,
    cracked: props.server.cracked,
    website_url: props.server.website_url || "",
    discord_url: props.server.discord_url || "",
    trailer_url: props.server.trailer_url || "",
    store_url: props.server.store_url || "",
    long_description: props.server.long_description,
    dsc_webhook_url: props.server.dsc_webhook_url || "",
    dsc_webhook_msg: props.server.dsc_webhook_msg || "",
    votifier: {
      votifier_host: props.server.votifier?.votifier_host || "",
      votifier_port: props.server.votifier?.votifier_port || "",
      votifier_token: props.server.votifier?.votifier_token || "",
    },
  });

  const submit = async () => {
    for (const key of Object.keys(details)) {
      if (key === "votifier") {
        for (const key2 of Object.keys(details.votifier)) {
          const check = validate[key2](details.votifier[key2]);
          if (check !== true) {
            toast.error(check);
            return;
          }
        }
      } else {
        const check = validate[key](details[key]);
        if (check !== true) {
          toast.error(check);
          return;
        }
      }
    }

    const data = { ...details };

    const optional = [
      "vanity",
      "website_url",
      "discord_url",
      "trailer_url",
      "store_url",
      "dsc_webhook_url",
      "dsc_webhook_msg",
      "votifier_host",
      "votifier_port",
      "votifier_token",
    ];

    for (const key of Object.keys(data)) {
      if (key === "votifier") {
        for (const key2 of Object.keys(data.votifier)) {
          if (!data.votifier[key2] && optional.includes(key2)) {
            data.votifier[key2] = null;
          }
        }
      } else {
        if (!data[key] && optional.includes(key)) {
          data[key] = null;
        }
      }
    }

    const split_address = data.host.split(":");

    if (split_address.length === 1) {
      data["host"] = data.host;
      data["port"] = null;
    } else if (split_address.length === 2) {
      const host = split_address[0];
      let port = parseInt(split_address[1].replace(/[^0-9]/g, ""));

      if (isNaN(port) || port < 0 || port > 65535) {
        toast.error("Invalid server address provided");
        return;
      }

      data["host"] = host;
      data["port"] = port;
    } else {
      toast.error("Invalid server address provided");
      return;
    }

    const token = cookie.get("token");
    const [response, error] = await EditServer(
      props.server.server_id,
      data,
      token
    );

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error(
            "An authorization error occured, please relogin and try again!"
          );
          break;
        case 409:
          if (
            error?.response?.data.payload.detail ===
            "Duplicate vantities are not allowed."
          ) {
            toast.error("The provided vanity URL is already taken!");
          } else {
            toast.error("Another server already uses that host and port!");
          }
          break;
        case 422:
          if (
            error.response?.data.payload.detail === "Invalid server address."
          ) {
            toast.error("Invalid server address provided!");
          } else if (
            error.response?.data.payload.detail ===
            "Invalid vanity URL provided"
          ) {
            toast.error("Invalid vanity URL provided!");
          } else {
            toast.error("Invalid information provided!");
          }
          break;
        default:
          toast.error("An unknown error occured, please try again later!");
      }
      return;
    }

    toast.success("Successfully edited your server!");
  };

  return (
    <Default user={props.user} noindex>
      <Head>
        <title>{`${props.server.name} - Minecraft Server List`}</title>
      </Head>
      <div className="flex w-full flex-row items-start justify-start space-x-6">
        <Navigation
          screen={screen}
          screens={screens}
          setScreen={setScreen}
          name={props.server.name}
          favicon={props.server.favicon}
          server={props.server}
          submit={submit}
        />
        <div className="flex w-full flex-col items-start justify-start space-y-4 overflow-hidden rounded-lg border-2 border-olive-930 bg-olive-950 p-8">
          {screen.name != "delete" ||
            (screen.name === "billing" && (
              <div className="flex w-full flex-row items-center justify-start">
                <h1 className="text-4xl font-medium text-white text-opacity-90">
                  {screen.label}
                </h1>
              </div>
            ))}
          {screen.name === "details" ? (
            <Details
              server={props.server}
              details={details}
              setDetails={setDetails}
            />
          ) : screen.name === "votifier" ? (
            <Votifier
              details={details}
              setDetails={setDetails}
              server_id={props.server.server_id}
            />
          ) : screen.name === "analytics" ? (
            <Analytics server={props.server} />
          ) : screen.name === "webhooks" ? (
            <Webhooks details={details} setDetails={setDetails} />
          ) : screen.name === "billing" ? (
            <Billing server={props.server} billing={props.billing} />
          ) : screen.name === "delete" ? (
            <Delete user={props.user} server={props.server} />
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
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    const [user, server, billing] = await Promise.all([
      GetLoggedInUser(ctx),
      FetchServer(ctx.params.id, token),
      FetchServerTransactions(ctx.params.id, token),
    ]);

    if (user[1]) {
      return {
        props: {
          error: user[1].response?.status || 500,
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

    if (billing[1]) {
      return {
        props: {
          error: billing[1].response?.status || 500,
        },
      };
    }

    if (server[0].payload.owner_id !== user[0].user_id) {
      return {
        redirect: {
          destination: `/server/${server[0].server_id}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: user[0],
        server: server[0].payload,
        billing: billing[0].payload,
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

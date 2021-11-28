import cookie from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import validate from "lib/validate";
import { NewServer } from "api/server";
import Details from "./screens/Details";
import Default from "ui/layouts/Default";
import Features from "./screens/Features";
import Votifier from "./screens/Votifier";
import { GetLoggedInUser } from "api/login";
import Description from "./screens/Description";
import Navigation from "./components/Navigation";

export default function AddServer(props) {
  const router = useRouter();

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
      "website_url",
      "discord_url",
      "trailer_url",
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
    const [response, error] = await NewServer(data, token);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("An authorization error occured, please relogin and try again!");
          break;
        case 409:
          toast.error("Another server already uses that host and port!");
          break;
        case 422:
          if (error.response?.data.payload.detail.reason === "invalid_address") {
            toast.error("Invalid server address provided!");
          } else if (error.response?.data.payload.detail.reason === "offline") {
            toast.error("Your server is currently offline!");
          } else {
            toast.error("Invalid information provided!");
          }
          break;
        default:
          toast.error("An unknown error occured, please try again later!");
      }
      return;
    }

    router.push(`/server/${response.data.payload}`);
  };

  return (
    <Default user={props.user} defaultResults={props.defaultResults}>
      <div className="flex flex-row items-start justify-start w-full space-x-6">
        <Navigation
          submit={submit}
          screen={screen}
          details={details}
          screens={screens}
          setScreen={setScreen}
        />
        <div className="flex flex-col items-start justify-start w-full p-8 space-y-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
          <div className="flex flex-row items-center justify-start w-full">
            <h1 className="font-medium text-4xl text-white text-opacity-90">{screen.label}</h1>
          </div>
          {screen.name === "details" ? (
            <Details details={details} setDetails={setDetails} />
          ) : screen.name === "features" ? (
            <Features details={details} setDetails={setDetails} />
          ) : screen.name === "description" ? (
            <Description details={details} setDetails={setDetails} />
          ) : screen.name === "votifier" ? (
            <Votifier details={details} setDetails={setDetails} />
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

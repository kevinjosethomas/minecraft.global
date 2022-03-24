import cookie from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import validate from "lib/validate";
import { NewServer } from "api/server";
import Details from "./screens/Details";
import Default from "ui/layouts/Default";
import Features from "./screens/Features";
import Votifier from "./screens/Votifier";
import { GetLoggedInUser } from "api/login";
import Description from "./screens/Description";
import Navigation from "./components/Navigation";

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

export default function AddServer(props) {
  const router = useRouter();
  const [screen, setScreen] = useState(screens[0]);

  const [details, setDetails] = useState({
    name: "",
    host: "",
    description: "",
    tags: [],
    whitelisted: false,
    bedrock: false,
    supports_bedrock: false,
    cracked: false,
    website_url: "",
    discord_url: "",
    trailer_url: "",
    store_url: "",
    long_description: "",
    votifier: {
      votifier_host: "",
      votifier_port: "",
      votifier_token: "",
    },
  });

  const incrementScreen = () => {
    const index = screens.findIndex((s) => s.name === screen.name);

    if (isNaN(index) || index + 1 >= screens.length) {
      return;
    }

    setScreen(screens[index + 1]);
  };

  const decrementScreen = () => {
    const index = screens.findIndex((s) => s.name === screen.name);

    if (isNaN(index) || index - 1 < 0) {
      return;
    }

    setScreen(screens[index - 1]);
  };

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
      "store_url",
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
          toast.error(
            "An authorization error occured, please relogin and try again!"
          );
          break;
        case 409:
          toast.error("Another server already uses that host and port!");
          break;
        case 422:
          if (
            error.response?.data.payload.detail.reason === "invalid_address"
          ) {
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
    <Default user={props.user} title="Add Server - Minecraft Server List">
      <div className="flex w-full items-start justify-start space-x-6">
        <Navigation
          submit={submit}
          screen={screen}
          details={details}
          screens={screens}
          setScreen={setScreen}
        />
        <div className="flex w-full flex-col items-start justify-start space-y-4">
          <div className="flex w-full flex-col items-start justify-start space-y-4 rounded-2xl border-2 border-olive-900 bg-olive-920 bg-opacity-90 p-8">
            <div className="flex w-full items-center justify-start">
              <h1 className="text-4xl font-medium text-white text-opacity-90">
                {screen.label}
              </h1>
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
          <div
            className={`flex w-full items-center justify-end ${
              screen.name !== "details" && "space-x-2"
            }`}
          >
            {screen.name !== "details" && (
              <div
                className="flex cursor-pointer items-center justify-center space-x-2.5 rounded-xl bg-olive-800 px-6 py-1.5 transition duration-300 hover:bg-olive-900"
                onClick={decrementScreen}
              >
                <i className="far fa-arrow-left text-lg text-white" />
                <p className="select-none text-lg text-white">Back</p>
              </div>
            )}
            {screen.name === "votifier" ? (
              <div
                className="flex cursor-pointer items-center justify-center space-x-2.5 rounded-xl bg-olive-800 px-6 py-1.5 transition duration-300 hover:bg-olive-900"
                onClick={submit}
              >
                <p className="select-none text-lg text-white">Add Server</p>
                <i className="far fa-rocket-launch text-lg text-white" />
              </div>
            ) : (
              <div
                className="flex cursor-pointer items-center justify-center space-x-2.5 rounded-xl bg-olive-800 px-6 py-1.5 transition duration-300 hover:bg-olive-900"
                onClick={incrementScreen}
              >
                <p className="select-none text-lg text-white">Next</p>
                <i className="far fa-arrow-right text-lg text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: user,
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

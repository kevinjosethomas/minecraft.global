import cookie from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import Tags from "./modals/Tags";
import validate from "lib/validate";
import GetLoggedInUser from "api/auth";
import { NewServer } from "api/server";
import Details from "./screens/Details";
import Default from "ui/layouts/Default";
import Features from "./screens/Features";
import Votifier from "./screens/Votifier";
import Toast from "ui/components/Toast/Toast";
import Description from "./screens/Description";
import Navigation from "./components/Navigation";

import "react-dropdown/style.css";

type AddServerProps = {
  user: Record<string, any>;
};

function AddServer(props: AddServerProps): JSX.Element {
  const screens = [
    {
      id: 1,
      name: "Server Details",
      screen: Details,
    },
    {
      id: 2,
      name: "Server Features",
      screen: Features,
    },
    {
      id: 3,
      name: "Server Description",
      screen: Description,
    },
    {
      id: 4,
      name: "Server Votifier",
      screen: Votifier,
    },
  ];

  const router = useRouter();

  const [activeScreen, setActiveScreen] = useState(screens[0]);
  const [params, setParams] = useState({
    name: "",
    host: "",
    port: null,
    description: "",
    tags: [],
    whitelisted: false,
    bedrock: false,
    cracked: false,
    website_url: "",
    discord_url: "",
    trailer_url: "",
    long_description: "",
    votifier_host: "",
    votifier_port: "",
    votifier_token: "",
  });

  const [tagsModal, showTagsModal] = useState(false);

  useEffect(() => {
    if (tagsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [tagsModal]);

  const decrementScreen = () => {
    setActiveScreen(screens.find((screen) => screen.id === activeScreen.id - 1) as any);
  };
  const incrementScreen = () => {
    setActiveScreen(screens.find((screen) => screen.id === activeScreen.id + 1) as any);
  };

  const submit = async () => {
    for (const key of Object.keys(params)) {
      const check = (validate as Record<string, CallableFunction>)[key](params);
      if (check !== true) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title={`Invalid ${key} provided`}
            subtitle={check}
          />
        ));
        return;
      }
    }

    const data: Record<string, any> = { ...params };

    const optional = [
      "website_url",
      "discord_url",
      "trailer_url",
      "votifier_host",
      "votifier_port",
      "votifier_token",
    ];

    for (const element of Object.keys(data)) {
      if (!data[element] && optional.includes(element)) {
        data[element] = null;
      }
    }

    const split_address = data.host.split(":");

    if (split_address.length === 1) {
      data["host"] = data.host;
      data["port"] = null;
    } else if (split_address.length === 2) {
      const host = split_address[0];
      let port = parseInt(split_address[1].replace(/[^0-9]/g, ""));

      if (isNaN(port)) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="Invalid server address provided"
            subtitle="Please make sure your server address is valid!"
          />
        ));
        return;
      }

      data["host"] = host;
      data["port"] = port;
    } else {
      toast.custom((t) => (
        <Toast
          icon="far fa-times-circle text-olive-600"
          title="Invalid server address provided"
          subtitle="Please make sure your server address is valid!"
        />
      ));
      return;
    }

    const token = cookie.get("token") as string;
    const [response, error]: any[] = await NewServer(
      {
        ...data,
        owner_id: props.user.user_id,
        votifier: {
          votifier_host: data.votifier_host,
          votifier_port: data.votifier_port,
          votifier_token: data.votifier_token,
        },
      },
      token
    );

    if (error) {
      if (error?.response?.status === 401) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="Invalid user access!"
            subtitle="Please try again when you are logged in!"
          />
        ));
      } else if (error?.response?.status === 409) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="This server is already on the list!"
            subtitle="Report it or contact support if you own the server!"
          />
        ));
      } else if (error?.response?.status === 422) {
        if (error?.response?.data.payload.detail.reason === "invalid_address") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Invalid server address provided!"
              subtitle="The provided server address is invalid!"
            />
          ));
        } else if (error?.response?.data.payload.detail.reason === "offline") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Your server is offline!"
              subtitle="Please make sure your server is online!"
            />
          ));
        } else {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Invalid info provided!"
              subtitle="Please make sure all provided input is valid!"
            />
          ));
        }
      } else {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="An unknown error occurred!"
            subtitle="Please try again later!"
          />
        ));
      }
      return;
    }

    router.push(`/server/${response.data.payload}`);
  };

  return (
    <Default background="bg-dark-700" user={props.user}>
      {tagsModal && (
        <Tags parameters={params} setParameters={setParams} showTagsModal={showTagsModal} />
      )}
      <div className="flex flex-col md:flex-row items-start justify-center space-y-4 md:space-y-0 md:space-x-10 w-full">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        <div className="flex flex-col items-start justify-center space-y-8 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-bold text-4xl md:text-5xl text-gray-300">
              {activeScreen.name}
            </span>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
              {activeScreen.id !== 1 && (
                <div
                  className="flex flex-row items-center justify-center px-2.5 space-x-2 bg-dark-300 hover:bg-dark-100 rounded select-none cursor-pointer transition duration-300"
                  onClick={decrementScreen}
                >
                  <i className="fas fa-long-arrow-alt-left md:text-lg text-gray-400" />
                  <span className="font-semibold md:text-lg text-gray-400">Back</span>
                </div>
              )}
              {activeScreen.id === 4 ? (
                <div
                  className="flex flex-row items-center justify-center px-2.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
                  onClick={submit}
                >
                  <span className="font-semibold md:text-lg text-gray-300">Submit</span>
                  <i className="fas fa-map-marker-check md:text-lg text-gray-300" />
                </div>
              ) : (
                <div
                  className="flex flex-row items-center justify-center px-2.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
                  onClick={incrementScreen}
                >
                  <span className="font-semibold md:text-lg text-gray-300">Next</span>
                  <i className="fas fa-long-arrow-alt-right md:text-lg text-gray-300" />
                </div>
              )}
            </div>
          </div>
          <activeScreen.screen
            params={params}
            setParams={setParams}
            showTagsModal={showTagsModal}
          />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      redirect: {
        destination: process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: (user as any).payload,
      },
    };
  }
}

export default AddServer;

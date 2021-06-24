import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

import Details from "./screens/Details";
import Features from "./screens/Features";
import Votifier from "./screens/Votifier";
import getAuth from "../../../../api/auth";
import Progress from "./components/Progress";
import Description from "./screens/Description";
import getServer from "../../../../api/server/[id]";
import editServer from "../../../../api/server/edit";
import StandardLayout from "../../../../layouts/Standard";

function NewServer(props) {
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
  const [activeScreen, setActiveScreen] = useState(screens.find((screen) => (screen.id = 1)));
  const updateActiveScreen = (id) => {
    setActiveScreen(screens.find((screen) => screen.id == id));
  };

  const router = useRouter();
  const { addToast } = useToasts();
  const defaultTags = [];
  props.server.tags.forEach((tag, index) => {
    defaultTags.push({
      label: tag,
    });
  });

  const [details, setDetails] = useState({
    name: props.server.name,
    host: props.server.host,
    port: props.server.port,
    description: props.server.description,
    tags: defaultTags,
    whitelisted: props.server.whitelisted || false,
    is_bedrock: props.server.is_bedrock || false,
    website_url: props.server.website_url,
    discord_url: props.server.discord_url,
    trailer_url: props.server.trailer_url,
    long_description: props.server.long_description,
    votifier_host: props.server.votifier_host,
    votifier_port: props.server.votifier_port,
    votifier_key: props.server.votifier_key,
  });

  const validate = {
    name: () => {
      if (details.name == null) {
        return "You must provide a server name!";
      }
      if (details.name.length < 2) {
        return "Your server name must be more than 2 characters in length!";
      }
      if (details.name.length > 32) {
        return "Your server name must not be more than 32 characters in length!";
      }
      return true;
    },
    host: () => {
      if (details.host == null) {
        return "You must provide a server host!";
      }
      if (details.host.length < 2) {
        return "Your server host must be more than 2 characters in length!";
      }
      if (details.host.length > 258) {
        return "Your server host must not be more than 258 characters in length!";
      }
      return true;
    },
    port: () => {
      if (
        details.port == null ||
        isNaN(parseInt(details.port)) ||
        parseInt(details.port) < 0 ||
        parseInt(details.port) > 65535
      ) {
        return "You must provide a valid server port!";
      }
      return true;
    },
    description: () => {
      if (details.description == null) {
        return "You must provide a server description!";
      }
      if (details.description.length < 15) {
        return "Your server description must be more than 15 characters in length!";
      }
      if (details.description.length > 220) {
        return "Your server description must not be more than 220 characters in length!";
      }
      return true;
    },
    long_description: () => {
      if (details.long_description == null) {
        return "You must provide a server long description!";
      }
      if (details.long_description.length < 150) {
        return "Your long description must be more than 150 characters in length!";
      }
      if (details.long_description.length > 5000) {
        return "Your long description must not be more than 5000 characters in length!";
      }
      return true;
    },
    tags: () => {
      if (details.tags == null) {
        return "You must provide server tags!";
      }
      if (details.tags.length < 2) {
        return "You must provide atleast 2 tags!";
      }
      if (details.tags.length > 5) {
        return "You must not provide more than 5 tags!";
      }
      return true;
    },
    is_bedrock: () => {
      if (
        details.is_bedrock == null ||
        (details.is_bedrock !== true && details.is_bedrock !== false)
      ) {
        return "Invalid input for Bedrock Edition!";
      }
      return true;
    },
    whitelisted: () => {
      if (
        details.whitelisted == null ||
        (details.whitelisted !== true && details.whitelisted !== false)
      ) {
        return "Invalid input for Whitelisted!";
      }
      return true;
    },
    website_url: () => {
      if (details.website_url == null) {
        return true;
      }
      if (details.website_url.length > 220) {
        return "Your server website link must not be more than 220 characters in length!";
      }
      return true;
    },
    discord_url: () => {
      if (details.discord_url == null) {
        return true;
      }
      if (details.discord_url.length > 32) {
        return "Your server discord link must not be more than 32 characters in length!";
      }
      return true;
    },
    trailer_url: () => {
      if (details.trailer_url == null) {
        return true;
      }
      if (details.trailer_url.length > 220) {
        return "Your server trailer link must not be more than 220 characters in length!";
      }
      return true;
    },
    votifier_host: () => {
      if (!details.votifier_host) {
        return true;
      }
      if (details.votifier_host.length < 2) {
        return "Your server Votifier host must be more than 2 characters in length!";
      }
      if (details.votifier_host.length > 258) {
        return "Your server host must not be more than 258 characters in length!";
      }
      return true;
    },
    votifier_port: () => {
      if (!details.votifier_port) {
        return true;
      }
      if (
        isNaN(parseInt(details.votifier_port)) ||
        parseInt(details.votifier_port) < 0 ||
        parseInt(details.votifier_port) > 65535
      ) {
        return "You must provide a valid server Votifier port!";
      }
      return true;
    },
    votifier_key: () => {
      if (!details.votifier_key) {
        return true;
      }
      if (details.votifier_key.length < 15) {
        return "Your server Votifier key must be more than 15 characters in length!";
      }
      if (details.votifier_key.length > 220) {
        return "Your server Votifier key must not be more than 220 characters in length!";
      }
      return true;
    },
  };

  const submit = async () => {
    let data = { ...details };
    for (const key of Object.keys(details)) {
      const check = validate[key]();
      if (check !== true) {
        addToast(check, {
          appearance: "error",
        });
        return;
      }

      if (details[key] == undefined) {
        data = { ...data, [key]: null };
      }
    }

    const token = cookie.get("token", { domain: "minecraft.global" });
    const [response, error] = await editServer(
      props.server.server_id,
      {
        ...data,
        port: parseInt(data.port),
        votifier_port: parseInt(data.votifier_port) || null,
        tags: details.tags.map((tag) => tag.name || tag.label),
      },
      token
    );

    if (error) {
      if (error?.response?.status == 409) {
        addToast("There's already a server with this hostname and port!", {
          appearance: "error",
        });
      } else if (error?.response?.status == 429) {
        addToast("You've hit a ratelimit, please wait before you continue!", {
          appearance: "error",
        });
      } else {
        addToast("An unknown error occured, please contact support!", {
          appearance: "error",
        });
      }
      return;
    }

    addToast(`Successfully edited your server! Redirecting you in 3 seconds!`, {
      appearance: "success",
    });

    setTimeout(() => {
      router.push(`/user/${props.user.user_id}`);
    }, 3000);
  };

  return (
    <StandardLayout user={props.user} footer={false}>
      <div className="flex flex-col items-start justify-start w-full h-full px-10 lg:px-20 2xl:px-56 py-14 md:py-32 bg-dark-80">
        <div className="flex flex-col items-start justify-center w-full h-full space-y-10">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-3xl md:text-5xl text-gray-300">{activeScreen.name}</h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 select-none">
              {activeScreen.id != 1 && (
                <div
                  className="flex flex-row items-center justify-center w-full md:w-auto px-3 py-1 space-x-2 bg-dark-60 hover:brightness-125 rounded cursor-pointer filter duration-500"
                  onClick={() => updateActiveScreen(activeScreen.id - 1)}
                >
                  <i className="fas fa-long-arrow-alt-left md:text-lg text-gray-400" />
                  <span className="font-semibold md:text-lg text-gray-400">Back</span>
                </div>
              )}
              {activeScreen.id != 4 && (
                <div
                  className="flex flex-row items-center justify-center w-full md:w-auto px-3 py-1 space-x-2 bg-olive-70 hover:brightness-125 rounded cursor-pointer filter duration-500"
                  onClick={() => updateActiveScreen(activeScreen.id + 1)}
                >
                  <span className="font-semibold md:text-lg text-gray-300">Next</span>
                  <i className="fas fa-long-arrow-alt-right md:text-lg text-gray-300" />
                </div>
              )}
              {activeScreen.id == 4 && (
                <div
                  className="flex flex-row items-center justify-center px-3 py-1 space-x-2 bg-olive-70 hover:brightness-125 rounded cursor-pointer filter duration-500"
                  onClick={submit}
                >
                  <span className="font-semibold md:text-lg text-gray-300">Submit</span>
                  <i className="fas fa-map-marker-check md:text-lg text-gray-300" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-start w-full h-full space-y-10 md:space-y-0 md:space-x-10">
            <Progress
              details={details}
              activeScreen={activeScreen}
              updateActiveScreen={updateActiveScreen}
            />
            <activeScreen.screen details={details} setDetails={setDetails} />
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

export async function getServerSideProps(ctx) {
  const [user, server] = await Promise.all([getAuth(ctx.req, ctx.res), getServer(ctx.params.id)]);

  if (!user.payload) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  } else {
    if (user.payload.user_id !== server.payload.owner_id) {
      return {
        redirect: {
          destination: `/server/${ctx.params.id}`,
          permanent: true,
        },
      };
    }
    return {
      props: {
        user: user.payload,
        server: server.payload,
      },
    };
  }
}

export default NewServer;

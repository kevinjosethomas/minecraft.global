import Cookies from "cookies";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import { EditUser } from "api/user";
import Profile from "./screens/Profile";
import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import Connections from "./screens/Connections";
import Navigation from "./components/Navigation";

const screens = [
  {
    name: "profile",
    label: "Profile",
    icon: "far fa-user",
  },
  {
    name: "accounts",
    label: "Accounts",
    icon: "far fa-plug",
  },
];

export default function EditUserPage(props) {
  const router = useRouter();

  const [screen, setScreen] = useState(screens[0]);

  useEffect(() => {
    if (!router.query.screen) {
      return;
    }

    const q = router.query.screen.toLowerCase();
    const s = screens.find((x) => x.name === q);

    if (s) {
      setScreen(s);
    }
  }, []);

  const [parameters, setParameters] = useState({
    name: props.user.name || "",
    description: props.user.description || "",
  });

  const submit = async () => {
    if (parameters.name.length < 3) {
      toast.error("Your name is too short! (3 chars) :/");
      return;
    }
    if (parameters.name.length > 32) {
      toast.error("Your name is too long! (32 chars) :/");
      return;
    }
    if (parameters.description?.length > 200) {
      toast.error("Your description is too long! (200 chars) :/");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await EditUser(
      props.user.user_id,
      {
        name: parameters.name,
        description: parameters.description || null,
      },
      token
    );

    if (error) {
      if (error.response?.status === 401) {
        toast.error("Please login and try again!");
      } else if (error.response?.status === 409) {
        toast.error("You are being ratelimit. Please try again later!");
      } else {
        toast.error("An unknown error occured. Please try again later!");
      }
      return;
    }

    toast.success("Successfully edited your profile!");
  };

  return (
    <Default user={props.user} title={`${props.user.name} - Minecraft Server List`} noindex>
      <div className="flex flex-row items-start justify-start w-full space-x-6">
        <Navigation
          submit={submit}
          user={props.user}
          screens={screens}
          screen={screen}
          setScreen={setScreen}
        />
        {screen.name === "profile" ? (
          <Profile user={props.user} parameters={parameters} setParameters={setParameters} />
        ) : screen.name === "accounts" ? (
          <Connections {...props.user} />
        ) : (
          <Fragment />
        )}
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const id = ctx.params.id;

    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    if (!token) {
      return {
        props: {
          error: 401,
        },
      };
    }

    const user = await GetLoggedInUser(ctx, true);

    if (user[1]) {
      return {
        props: {
          error: user[0][1].response?.status || 500,
        },
      };
    }

    if (user[0].user_id != id) {
      return {
        props: {
          error: 401,
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

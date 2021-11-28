import Cookies from "cookies";
import { useState } from "react";

import Billing from "./screens/Billing";
import Profile from "./screens/Profile";
import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import { GetUserTransactions } from "api/user";
import Connections from "./screens/Connections";
import Navigation from "./components/Navigation";

export default function EditUser(props) {
  const screens = [
    {
      id: 1,
      label: "Profile",
    },
    {
      id: 2,
      label: "Connections",
    },
    {
      id: 3,
      label: "Billing",
    },
  ];

  const [activeScreen, setActiveScreen] = useState(screens[0]);

  return (
    <Default user={props.user} title={`${props.user.name} - Minecraft Server List`}>
      <div className="flex flex-col items-start justify-center w-full space-y-4">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        {activeScreen.id === 1 ? (
          <Profile user={props.user} />
        ) : activeScreen.id === 2 ? (
          <Connections {...props.user} />
        ) : (
          <Billing billing={props.billing} />
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

    const user = GetLoggedInUser(ctx, true);
    const billing = GetUserTransactions(id, token);

    const responses = await Promise.all([user, billing]);

    if (responses[0][1]) {
      return {
        props: {
          error: responses[0][1].response?.status || 500,
        },
      };
    }

    if (responses[1][1]) {
      return {
        props: {
          error: responses[1][1].response?.status || 500,
        },
      };
    }

    if (responses[0][0].user_id != id) {
      return {
        props: {
          error: 401,
        },
      };
    }

    return {
      props: {
        user: responses[0][0],
        billing: responses[1][0],
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

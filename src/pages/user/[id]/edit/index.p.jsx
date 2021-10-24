import { useState } from "react";

import Profile from "./screens/Profile";
import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
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
    <Default user={props.user}>
      <div className="flex flex-col items-start justify-center w-full space-y-4">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        {activeScreen.id === 1 ? <Profile user={props.user} /> : <Profile />}
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [response, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        props: {},
      };
    } else {
      return {
        props: {
          user: response,
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

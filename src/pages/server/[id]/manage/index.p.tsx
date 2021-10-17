import { useState } from "react";
import { GetServerSidePropsContext } from "next";

import Edit from "./screens/Edit";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Votifier from "./screens/Votifier";
import { GetEditServer } from "api/server";
import Navigation from "./components/Navigation";

type ManageServerProps = {
  user: Record<string, any>;
  server: Record<string, any>;
};

function ManageServer(props: ManageServerProps): JSX.Element {
  const screens = [
    {
      id: 1,
      icon: "far fa-edit",
      name: "Edit",
      screen: Edit,
    },

    {
      id: 2,
      icon: "far fa-box-ballot",
      name: "Votifier",
      screen: Votifier,
    },
    {
      id: 3,
      icon: "far fa-analytics",
      name: "Analytics",
      screen: Edit,
    },
    {
      id: 4,
      icon: "far fa-credit-card-blank",
      name: "Widgets",
      screen: Edit,
    },
    {
      id: 5,
      icon: "far fa-trash-alt",
      name: "Delete",
      screen: Edit,
    },
  ];

  const [activeScreen, setActiveScreen] = useState(screens[0]);

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-row items-start justify-center w-full space-x-4">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        <div className="flex flex-row items-center justify-center w-full">
          <activeScreen.screen server={props.server} user={props.user} />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;
  const [user, error] = await GetLoggedInUser(ctx);
  const [server, error2] = await GetEditServer(ctx, id);

  if (error || error2) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  if (server.owner_id !== user.payload.user_id) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {
      user: user.payload,
      server: server,
      id: id,
    },
  };
}

export default ManageServer;

import { useState } from "react";
import { GetServerSidePropsContext } from "next";

import { GetServer } from "api/server";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Navigation from "./components/Navigation";

type ManageServerProps = {
  user?: Record<string, any>;
};

function ManageServer(props: ManageServerProps): JSX.Element {
  const screens = [
    {
      id: 1,
      icon: "far fa-edit",
      name: "Edit",
    },

    {
      id: 2,
      icon: "far fa-box-ballot",
      name: "Votifier",
    },
    {
      id: 3,
      icon: "far fa-analytics",
      name: "Analytics",
    },
    {
      id: 4,
      icon: "far fa-credit-card-blank",
      name: "Widgets",
    },
    {
      id: 5,
      icon: "far fa-trash-alt",
      name: "Delete",
    },
  ];

  const [activeScreen, setActiveScreen] = useState(screens[0]);

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-row items-center justify-center w-full">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        <div className="flex flex-row items-center justify-center w-full"></div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id;
  const [user, error] = await GetLoggedInUser(ctx);
  const [server, error2] = await GetServer(id as string);

  if (error2) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } else {
    if (error) {
      return {
        props: {
          id: id,
          server: server,
        },
      };
    } else {
      return {
        props: {
          user: user.payload,
          server: server,
          id: id,
        },
      };
    }
  }
}

export default ManageServer;

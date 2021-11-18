import Cookies from "cookies";
import { useState } from "react";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";
import { GetEditServerByID } from "api/server";
import Navigation from "./components/Navigation";

export default function ManageServer(props) {
  const [screen, setScreen] = useState("information");

  return (
    <Default user={props.user}>
      <div className="flex flex-row items-start justify-start w-full space-x-6">
        <Navigation name={props.server.name} favicon={props.server.favicon} />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    const responses = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(ctx),
      GetEditServerByID(ctx.params.id, token),
    ]);

    const user = responses[0];
    const data = responses[1];
    const server = responses[2];

    if (user[1]) {
      return {
        props: {
          error: user[1].response?.status || 500,
        },
      };
    }

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
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

    return {
      props: {
        user: user[0],
        server: server[0],
        defaultResults: data[0],
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

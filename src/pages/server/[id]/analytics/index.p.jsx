import Cookies from "cookies";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import { GetServerByID, GetServerAnalytics } from "api/server";

export default function Server(props) {
  return <Default user={props.user}></Default>;
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    if (!token) {
      return {
        props: {
          error: 401,
        },
      };
    }

    const [user, server, analytics] = await Promise.all([
      GetLoggedInUser(ctx),
      GetServerByID(ctx.params.id),
      GetServerAnalytics(ctx.params.id, token),
    ]);

    if (user[1]) {
      return {
        props: {
          error: user[1].response?.status || 500,
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

    if (analytics[1]) {
      return {
        props: {
          error: analytics[1].response?.status || 500,
        },
      };
    }

    if (user[0].user_id != server[0].owner_id) {
      return {
        props: {
          error: 401,
        },
      };
    }

    return {
      props: {
        user: user[0],
        server: server[0],
        analytics: analytics[0].payload,
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

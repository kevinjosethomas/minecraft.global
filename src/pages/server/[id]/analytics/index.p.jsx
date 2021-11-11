import moment from "moment";
import Cookies from "cookies";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import PlayersTotal from "./charts/PlayersTotal";
import PlayersChange from "./charts/PlayersChange";
import { GetServerByID, GetServerAnalytics } from "api/server";

export default function Server(props) {
  const durations = [1, 7, 15, 30];

  const labels = {
    1: props.analytics.records.slice(-1 * 1 * 24).map((x) => moment(x.checked_at).format("hh:mm")),
    7: props.analytics.records.slice(-1 * 7 * 24).map((x) => moment(x.checked_at).format("DD/MM")),
    15: props.analytics.records
      .slice(-1 * 15 * 24)
      .map((x) => moment(x.checked_at).format("DD/MM")),
    30: props.analytics.records
      .slice(-1 * 30 * 24)
      .map((x) => moment(x.checked_at).format("DD/MM")),
  };

  const fetch = (property, duration) => {
    return props.analytics.records.slice(-1 * duration * 24).map((x) => x[property]);
  };

  return (
    <Default user={props.user}>
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <PlayersTotal labels={labels} durations={durations} fetch={fetch} />
        <PlayersChange labels={labels} durations={durations} fetch={fetch} />
      </div>
    </Default>
  );
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

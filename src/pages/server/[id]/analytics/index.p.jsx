import moment from "moment";
import Cookies from "cookies";

import CPU from "./analytics/CPU";
import TPS from "./analytics/TPS";
import World from "./analytics/World";
import Memory from "./analytics/Memory";
import Default from "ui/layouts/Default";
import Upvotes from "./analytics/Upvotes";
import Players from "./analytics/Players";
import Messages from "./analytics/Messages";
import { GetLoggedInUser } from "api/login";
import Pageviews from "./analytics/Pageviews";
import Impressions from "./analytics/Impressions";
import { GetServerByID, GetServerAnalytics } from "api/server";

export default function ServerAnalytics(props) {
  const analytics = [Players, Upvotes, Pageviews, Impressions, Memory, CPU, TPS, Messages, World];

  const labels = {
    1: props.analytics.records.slice(-1 * 1 * 24).map((x) => moment(x.checked_at).format("H:mm")),
    7: props.analytics.records.slice(-1 * 7 * 24).map((x) => moment(x.checked_at).format("D/MM")),
    15: props.analytics.records.slice(-1 * 15 * 24).map((x) => moment(x.checked_at).format("D/MM")),
    30: props.analytics.records.slice(-1 * 30 * 24).map((x) => moment(x.checked_at).format("D/MM")),
  };

  const fetch = (property, duration) => {
    const sliced = props.analytics.records.slice(-1 * duration * 24);
    const values = sliced.map((x) => {
      if (property === "mem_usage_bytes" || property === "world_size_bytes") {
        return Math.ceil(x[property] / 1000000);
      } else if (property === "cpu_percent") {
        return x[property] * 100;
      }

      return x[property];
    });

    return values;
  };

  return (
    <Default
      user={props.user}
      title={`${props.analytics.name} Analytics - Minecraft Server List`}
      noindex
    >
      <div className="flex flex-col items-start justify-start w-full space-y-5">
        <div className="flex flex-row items-center justify-start space-x-4">
          <img
            className="w-16 h-16 rounded"
            src={props.analytics.favicon || "/images/default_server_favicon.png"}
            alt={`${props.analytics.name}'s favicon'`}
            draggable="false"
          />
          <h1 className="font-medium text-4xl text-white text-opacity-80">
            {props.analytics.name} Server Analytics
          </h1>
          <i className="fad fa-diamond text-4xl text-olive-500" />
        </div>
        <div className="w-full h-0.5 bg-white bg-opacity-10" />
        <div className="flex flex-col items-start justify-start w-full space-y-8">
          {analytics.map((Analytic, i) => (
            <Analytic
              key={i}
              index={i}
              fetch={fetch}
              labels={labels}
              analytics={props.analytics.records}
            />
          ))}
        </div>
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

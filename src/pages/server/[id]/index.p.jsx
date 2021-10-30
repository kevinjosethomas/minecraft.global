import Upvote from "./components/Upvote";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";
import Identity from "./components/Identity";

export default function Server(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <Identity
            name={props.server.name}
            favicon={props.server.favicon}
            description={props.server.description}
          />
          <Upvote server_id={props.server.server_id} monthly_votes={props.server.monthly_votes} />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = GetLoggedInUser(ctx);
    const data = GetDefaultData(ctx);
    const server = GetServerByID(ctx.params.id);

    const [userdata, defaultdata, serverdata] = await Promise.all([user, data, server]);

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (serverdata[1]) {
      return {
        props: {
          error: serverdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          server: serverdata[0],
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          user: userdata[0],
          server: serverdata[0],
          defaultResults: defaultdata[0],
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

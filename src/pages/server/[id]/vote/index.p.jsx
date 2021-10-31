import Default from "ui/layouts/Default";
import Upvote from "./components/Upvote";
import { GetDefaultData } from "api/core";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";
import Identity from "./components/Identity";
import TopVoters from "./components/TopVoters";

export default function UpvoteServer(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <Identity name={props.server.name} favicon={props.server.favicon} />
        <div className="flex flex-row items-start justify-start w-full space-x-8">
          <div className="flex flex-col items-start justify-start w-full">
            <Upvote server_id={props.server.server_id} />
          </div>
          <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-8 overflow-hidden">
            <TopVoters server_id={props.server.server_id} />
          </div>
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

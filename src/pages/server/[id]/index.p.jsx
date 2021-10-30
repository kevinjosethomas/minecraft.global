import Default from "ui/layouts/Default";
import Header from "./components/Header";
import { GetDefaultData } from "api/core";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";

export default function Server(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start w-full">
        <Header
          server_id={props.server.server_id}
          name={props.server.name}
          tags={props.server.tags}
          favicon={props.server.favicon}
          description={props.server.description}
          monthly_votes={props.server.monthly_votes}
        />
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

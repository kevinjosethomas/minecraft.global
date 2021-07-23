import ReactMarkdown from "react-markdown";
import SimplifyNumber from "simplify-number";
import { GetServerSidePropsContext } from "next";

import { GetServer } from "api/server";
import GetLoggedInUser from "api/auth";
import Social from "./components/Social";
import Default from "ui/layouts/Default";
import Feature from "./components/Feature";
import { Server as ServerProps } from "lib/types";

type Server = {
  id: string;
  user?: object;
  server: ServerProps;
};

function Server(props: Server): JSX.Element {
  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-col items-start justify-start w-[70%] space-y-6">
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-col items-start justify-start space-y-6">
              <div className="flex flex-row items-center justify-start space-x-4">
                <img src={props.server.favicon} alt={props.server.name} />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="font-bold text-4xl text-gray-300">{props.server.name}</h1>
                  <span className="font-medium text-gray-400">
                    {props.server.host} +{" "}
                    {SimplifyNumber(props.server.players_online, { decimal: 1 })} players
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start space-x-2 overflow-x-scroll">
                {props.server.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="flex flex-row items-center justify-center px-2 py-1 bg-dark-900 rounded"
                  >
                    <span className="text-sm font-medium text-gray-400 select-none whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-start space-y-3">
              {props.server.website_url && (
                <Social icon="far fa-link" href={props.server.website_url} />
              )}
              {props.server.discord_url && (
                <Social icon="fab fa-discord" href={props.server.discord_url} />
              )}
              {props.server.trailer_url && (
                <Social icon="fab fa-youtube" href={props.server.trailer_url} />
              )}
            </div>
          </div>
          <div className="flex flex-row justify-start items-start w-full p-5 border-2 border-gray-800 rounded bg-dark-800">
            <ReactMarkdown className="long-description font-medium text-gray-400 whitespace-pre-wrap">
              {props.server.long_description}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-[25%] space-y-6 overflow-x-hidden">
          <div className="flex flex-col items-start justify-start space-y-2">
            <div className="flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fas fa-info-circle text-2xl text-gray-300" />
                <span className="font-bold text-2xl text-gray-300">Brief Description</span>
              </div>
              <span className="font-medium text-gray-400">{props.server.description}</span>
            </div>
            <div className="flex flex-row items-center justify-start space-x-2">
              {props.server.whitelisted && <Feature label="Whitelisted" />}
              {props.server.is_bedrock && <Feature label="Bedrock" />}
              {props.server.is_cracked && <Feature label="Cracked" />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full space-y-2">
            <div className="flex flex-row items-center justify-start w-full rounded border-2 border-gray-800">
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-dark-400 rounded-l">
                <i className="fas fa-arrow-alt-up text-2xl text-gray-400" />
              </div>
              <div className="flex flex-row items-center justify-start flex-1 h-14 p-4 space-x-4 bg-dark-600 rounded-r">
                <span className="font-bold text-2xl text-gray-400 select-none">Upvote Server</span>
                <div className="flex flex-row items-center justify-center px-3 py-0.5 bg-dark-200 rounded-full">
                  <span className="font-bold text-gray-400">
                    {SimplifyNumber(props.server.monthly_votes, { decimal: 1 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id;
  const [user, error] = await GetLoggedInUser(ctx);
  const [server, error2] = await GetServer(id as string);

  if (error) {
    return {
      props: {
        id: id,
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

export default Server;

import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import SimplifyNumber from "simplify-number";
import { GetServerSidePropsContext } from "next";

import { GetServer } from "api/server";
import GetLoggedInUser from "api/auth";
import Social from "./components/Social";
import Default from "ui/layouts/Default";
import { GetTopVoters } from "api/server";
import Feature from "./components/Feature";
import UpvoteModal from "./modals/upvote/Upvote";
import { Server as ServerProps } from "lib/types";

type Server = {
  id: string;
  user?: Record<string, any>;
  server: ServerProps;
};

function Server(props: Server): JSX.Element {
  const router = useRouter();
  const id = router.query.id;

  const [topVoters, setTopVoters] = useState();
  const [upvoteModal, showUpvoteModal] = useState(false);

  useEffect(() => {
    (async () => {
      const [response, error] = await GetTopVoters(id as string);
      setTopVoters(response);
    })();
  }, []);

  useEffect(() => {
    if (upvoteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [upvoteModal]);

  return (
    <Default background="px-0 bg-dark-700" user={props.user}>
      {upvoteModal && (
        <UpvoteModal
          voters={topVoters as any}
          server={props.server}
          showUpvoteModal={showUpvoteModal}
        />
      )}
      <div className="flex flex-row items-start justify-between scroll-snap w-full space-x-8 md:space-x-0 overflow-x-scroll md:overflow-x-hidden no-scrollbar">
        <div className="flex flex-col items-start justify-start scroll-snap-child pl-5 max-w-[80%] md:w-[70%] space-y-6">
          <div className="flex flex-col md:flex-row items-start justify-between space-y-3 w-full overflow-x-hidden">
            <div className="flex flex-col items-start justify-start space-y-3 md:space-y-6 w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-start space-y-3 md:space-y-0 md:space-x-4">
                <img src={props.server.favicon} alt={props.server.name} />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="font-bold text-4xl text-gray-300">{props.server.name}</h1>
                  <span className="font-medium text-gray-400">
                    {props.server.host} +{" "}
                    {SimplifyNumber(props.server.players_online, { decimal: 1 })} players
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start w-full space-x-2 overflow-x-scroll no-scrollbar">
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
            <div className="flex flex-row md:flex-col items-center justify-start space-x-3 md:space-x-0 md:space-y-3">
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
          <div className="flex flex-row justify-start items-start w-full p-3 md:p-5 border-2 border-gray-800 rounded bg-dark-800">
            <ReactMarkdown className="long-description font-medium text-gray-400 whitespace-pre-wrap overflow-x-hidden">
              {props.server.long_description}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start scroll-snap-child pr-5 min-w-[80%] md:min-w-0 md:w-[25%] space-y-6">
          <div className="flex flex-col items-start justify-start space-y-2">
            <div className="flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start space-x-2 whitespace-nowrap">
                <i className="fas fa-info-circle text-xl md:text-lg xl:text-2xl text-gray-300" />
                <span className="font-bold text-xl md:text-lg xl:text-2xl text-gray-300">
                  Brief Description
                </span>
              </div>
              <span className="font-medium text-sm xl:text-base text-gray-400">
                {props.server.description}
              </span>
            </div>
            <div className="flex flex-row items-center justify-start space-x-2">
              {props.server.whitelisted && <Feature label="Whitelisted" />}
              {props.server.bedrock && <Feature label="Bedrock" />}
              {props.server.cracked && <Feature label="Cracked" />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full space-y-2">
            <div
              className="flex flex-row items-center justify-start w-full rounded border-2 border-gray-800 transform hover:scale-102 duration-300 cursor-pointer"
              onClick={() => showUpvoteModal(true)}
            >
              <div className="flex flex-col items-center justify-center w-10 xl:w-12 2xl:w-14 h-10 xl:h-12 2xl:h-14 bg-dark-400 rounded-l">
                <i className="fas fa-arrow-alt-up text-base md:text-sm xl:text-lg 2xl:text-2xl text-gray-400" />
              </div>
              <div className="flex flex-row items-center justify-start flex-1 h-10 xl:h-12 2xl:h-14 px-2 xl:px-4 space-x-4 bg-dark-600 rounded-r">
                <span className="font-bold text-base md:text-sm xl:text-lg 2xl:text-2xl text-gray-400 select-none">
                  Upvote <span className="hidden md:inline">Server</span>
                </span>
                <div className="flex flex-row items-center justify-center px-2 xl:px-3 py-0.5 bg-dark-200 rounded-full">
                  <span className="font-bold text-base md:text-sm xl:text-base text-gray-400">
                    {SimplifyNumber(props.server.monthly_votes, { decimal: 1 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            {props.server.owner_id === props.user?.user_id ? (
              <Link href={`/server/${props.server.server_id}/edit`}>
                <a className="font-medium text-gray-400">Edit Server</a>
              </Link>
            ) : (
              <span className="font-medium text-red-700 hover:text-red-600 cursor-pointer">
                Report Server
              </span>
            )}
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

export default Server;

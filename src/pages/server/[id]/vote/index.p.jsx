import Link from "next/link";

import Default from "ui/layouts/Default";
import Upvote from "./components/Upvote";
import { GetDefaultData } from "api/core";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";
import TopVoters from "./components/TopVoters";

export default function UpvoteServer(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <div className="flex flex-row items-start justify-start w-full space-x-8">
          <div className="flex flex-col items-start justify-start w-full">
            <Upvote
              server_id={props.server.server_id}
              name={props.server.name}
              favicon={props.server.favicon}
            />
          </div>
          <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-8 overflow-hidden">
            <TopVoters server_id={props.server.server_id} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full h-[220px] bg-olive-950 overflow-hidden rounded border-2 border-olive-920">
          <div className="flex flex-col items-start justify-between h-full p-8">
            <div className="flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start space-x-2">
                <span className="inline text-[32px] text-white text-opacity-80">Find similar</span>
                <Link href={`/tag/${props.tag}`}>
                  <a className="group flex flex-row items-center justify-start space-x-1.5 px-2.5 py-0.5 bg-white bg-opacity-[0.06] hover:bg-opacity-10 rounded-[4px] cursor-pointer transition duration-300">
                    <i className="far fa-hashtag text-[16px] text-olive-600" />
                    <span className="text-[20px] text-white text-opacity-70 group-hover:text-opacity-80 transition duration-300">
                      {props.tag}
                    </span>
                  </a>
                </Link>
                <span className="inline text-[32px] text-white text-opacity-80">servers</span>
              </div>
              <span className="max-w-md text-[20px] text-white text-opacity-80 leading-tight">
                Browse through hundreds of similar Minecraft servers to play on!
              </span>
            </div>
            <Link href={`/tag/${props.tag}`}>
              <a className="group flex flex-row items-center justify-center px-4 py-2 space-x-2 bg-olive-600 bg-opacity-25 hover:bg-opacity-50 rounded-[6px] select-none transition duration-300">
                <span className="font-medium text-[18px] text-white">See More</span>
                <i className="far fa-angle-right text-[18px] text-white group-hover:translate-x-0.5 transform duration-300" />
              </a>
            </Link>
          </div>
          <img src="/images/servers.png" alt="servers" draggable="false" className="-rotate-6" />
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

    const tag = serverdata[0].tags[Math.floor(Math.random() * serverdata[0].tags.length)];

    if (userdata[1]) {
      return {
        props: {
          tag: tag,
          server: serverdata[0],
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          tag: tag,
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

import Head from "next/head";
import { useState } from "react";

import Back from "./components/Back";
import Default from "ui/layouts/Default";
import Upvote from "./components/Upvote";
import { GetDefaultData } from "api/core";
import Similar from "./components/Similar";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";
import Advertise from "./components/Advertise";
import TopVoters from "./components/TopVoters";

export default function UpvoteServer(props) {
  const [upvoted, setUpvoted] = useState(false);

  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <Head>
        <title>Vote for {props.server.name} - Minecraft Server List</title>

        <link
          rel="canonical"
          href={`https://minecraft.global/server/${props.server.server_id}/vote`}
        />

        <meta name="title" content={`Vote - ${props.server.name}`} />
        <meta
          name="description"
          content={`Vote for ${props.server.name}! ${props.server.description}`}
        />

        <meta property="og:title" content={`Vote - ${props.server.name}`} />
        <meta
          property="og:description"
          content={`Vote for ${props.server.name} here! ${props.server.description}`}
        />
        <meta
          property="og:image"
          content={`https://api.minecraft.global/server/${props.server.server_id}/favicon`}
        />

        <meta property="twitter:title" content={`Vote - ${props.server.name}`} />
        <meta
          property="twitter:description"
          content={`Vote for ${props.server.name}! ${props.server.description}`}
        />
        <meta
          property="twitter:image"
          content={`https://api.minecraft.global/server/${props.server.server_id}/favicon`}
        />

        <meta
          name="keywords"
          content={`${props.server.name}, ${props.server.name} IP Address, ${
            props.server.name
          } Vote, ${props.server.name} Discord, ${props.server.tags.join(
            " minecraft servers, "
          )} minecraft servers`}
        />
      </Head>
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <Back server_id={props.server.server_id} />
        <div className="flex flex-col md:flex-row items-start justify-start w-full space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-start justify-start w-full">
            {upvoted ? (
              <Advertise tags={props.server.tags} name={props.server.name} />
            ) : (
              <Upvote
                upvoted={upvoted}
                setUpvoted={setUpvoted}
                name={props.server.name}
                favicon={props.server.favicon}
                server_id={props.server.server_id}
              />
            )}
          </div>
          <div className="flex flex-col items-start justify-start w-full md:min-w-[400px] md:w-[400px] md:max-w-[400px] space-y-8 overflow-hidden">
            <TopVoters server_id={props.server.server_id} />
          </div>
        </div>
        <Similar tag={props.tag} />
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

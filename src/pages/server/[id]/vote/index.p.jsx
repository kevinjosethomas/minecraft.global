import moment from "moment";
import Head from "next/head";
import { useEffect, useState } from "react";

import Back from "./components/Back";
import { FetchServer } from "api/server";
import Default from "ui/layouts/Default";
import Upvote from "./components/Upvote";
import { GetDefaultData } from "api/core";
import Similar from "./components/Similar";
import { GetLoggedInUser } from "api/login";
import Advertise from "./components/Advertise";
import TopVoters from "./components/TopVoters";
import { FetchTimeTillUpvote } from "api/upvote";

export default function UpvoteServer(props) {
  const [upvoted, setUpvoted] = useState(false);
  const [canVoteAt, setCanVoteAt] = useState();
  const [previouslyVoted, setPreviouslyVoted] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem("upvote_playername");

      if (!stored) return;

      const [response, error] = await FetchTimeTillUpvote(
        props.server.server_id,
        stored
      );

      if (error || !response.payload.can_vote_at) {
        return;
      }

      setUpvoted(true);
      setPreviouslyVoted(true);
      setCanVoteAt(moment(response.payload.can_vote_at).local().toDate());
    })();
  }, []);

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

        <meta
          property="twitter:title"
          content={`Vote - ${props.server.name}`}
        />
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
      <div className="flex w-full flex-col items-start justify-start space-y-6">
        <Back server_id={props.server.server_id} />
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:flex-row md:space-y-0 md:space-x-8">
          <div className="flex w-full flex-col items-start justify-start">
            {upvoted ? (
              <Advertise
                canVoteAt={canVoteAt}
                tags={props.server.tags}
                name={props.server.name}
                previouslyVoted={previouslyVoted}
              />
            ) : (
              <Upvote
                upvoted={upvoted}
                setUpvoted={setUpvoted}
                name={props.server.name}
                favicon={props.server.favicon}
                server_id={props.server.server_id}
                setCanVoteAt={setCanVoteAt}
              />
            )}
          </div>
          <div className="flex w-full flex-col items-start justify-start space-y-8 overflow-hidden md:w-[400px] md:min-w-[400px] md:max-w-[400px]">
            <TopVoters server_id={props.server.server_id} />
          </div>
        </div>
        <a
          href="https://discord.minecraft.global/"
          target="_blank"
          rel="noopener"
        >
          <img
            src="/images/votepage-ad.png"
            draggable="false"
            alt="Rent this advertisement spot"
            className="rounded"
          />
        </a>
        {/* <div className="flex flex-col items-center justify-start space-y-2 rounded border-2 border-olive-920 bg-olive-950 p-4">
          <p className="text-2xl font-medium text-white text-opacity-90">
            Sponsored
          </p>
          <a href="https://oreomc.com/" target="_blank" rel="noopener">
            <img
              src="/images/oreomc-ad.png"
              draggable="false"
              alt="Semi Vanilla MC 1.18.1 Survival Join Now"
              className="rounded"
            />
          </a>
        </div> */}
        {/* <Similar tag={props.tag} /> */}
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data, server] = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(),
      FetchServer(ctx.params.id),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
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

    const tag =
      server[0].payload.tags[
        Math.floor(Math.random() * server[0].payload.tags.length)
      ];

    if (user[1]) {
      return {
        props: {
          tag: tag,
          server: server[0].payload,
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          tag: tag,
          user: user[0],
          server: server[0].payload,
          defaultResults: data[0],
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

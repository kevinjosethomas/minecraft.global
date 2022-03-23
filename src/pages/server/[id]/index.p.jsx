import Head from "next/head";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { FetchServer } from "api/server";
import Default from "ui/layouts/Default";
import Report from "./index/modals/Report";
import { GetLoggedInUser } from "api/login";
import Header from "./index/components/Header";
import Comments from "./index/screens/Comments";
import Overview from "./index/screens/Overview";
import Sidebar from "./index/components/Sidebar";
import Navigation from "./index/components/Navigation";

export default function Server(props) {
  const [screen, setScreen] = useState("overview");
  const [reportModal, showReportModal] = useState(false);

  return (
    <Default user={props.user} search>
      <Head>
        <title>{props.server.name} - Minecraft Server List</title>

        <link
          rel="canonical"
          href={`https://minecraft.global/server/${props.server.server_id}`}
        />

        <meta
          name="title"
          content={`${props.server.name} - Minecraft Server List`}
        />
        <meta
          name="description"
          content={`${props.server.name} IP, Vote, Store & Discord - ${props.server.description}`}
        />

        <meta
          property="og:title"
          content={`${props.server.name} - Minecraft Server List`}
        />
        <meta
          property="og:description"
          content={`${props.server.name} IP, Vote, Store & Discord - ${props.server.description}`}
        />
        <meta
          property="og:image"
          content={`https://api.minecraft.global/server/${props.server.server_id}/favicon`}
        />

        <meta
          property="twitter:title"
          content={`${props.server.name} - Minecraft Server List`}
        />
        <meta
          property="twitter:description"
          content={`${props.server.name} IP, Vote, Store & Discord - ${props.server.description}`}
        />
        <meta
          property="twitter:image"
          content={`https://api.minecraft.global/server/${props.server.server_id}/favicon`}
        />

        <meta
          name="keywords"
          content={`${props.server.name}, ${props.server.name} IP Address, ${
            props.server.name
          } Store, ${props.server.name} Vote, ${
            props.server.name
          } Discord, ${props.server.tags.join(
            " minecraft servers, "
          )} minecraft servers`}
        />
      </Head>
      <AnimatePresence>
        {reportModal && (
          <Report showModal={showReportModal} id={props.server.server_id} />
        )}
      </AnimatePresence>
      <div className="flex w-full flex-col items-start justify-start space-y-10 md:mt-6 md:space-y-16">
        <Header
          server_id={props.server.server_id}
          name={props.server.name}
          tags={props.server.tags}
          favicon={props.server.favicon}
          description={props.server.description}
          monthly_votes={props.server.monthly_votes}
          premium={props.server.premium}
        />
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-8">
          <Navigation
            screen={screen}
            user={props.user}
            server={props.server}
            setScreen={setScreen}
          />
          <div className="flex w-full flex-col items-start justify-start space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex w-full flex-col items-start justify-start">
              {screen === "overview" ? (
                <Overview long_description={props.server.long_description} />
              ) : (
                <Comments
                  server_id={props.server.server_id}
                  user={props.user}
                />
              )}
            </div>
            <Sidebar
              {...props.server}
              user_id={props.user?.user_id}
              showReportModal={showReportModal}
            />
          </div>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, server] = await Promise.all([
      GetLoggedInUser(ctx),
      FetchServer(ctx.params.id),
    ]);

    if (server[1]) {
      return {
        props: {
          error: server[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          server: server[0].payload,
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          server: server[0].payload,
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

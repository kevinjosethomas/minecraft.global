import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Report from "./index/modals/Report";
import Default from "ui/layouts/Default";
import Header from "./index/components/Header";
import Comments from "./index/screens/Comments";
import Overview from "./index/screens/Overview";
import { GetDefaultData } from "api/core";
import Sidebar from "./index/components/Sidebar";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";
import Navigation from "./index/components/Navigation";

export default function Server(props) {
  const [screen, setScreen] = useState("overview");
  const [reportModal, showReportModal] = useState(false);

  useEffect(() => {
    if (reportModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [reportModal]);

  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <Head>
        <title>{props.server.name} - Minecraft Server List</title>

        <link rel="canonical" href={`https://minecraft.global/server/${props.server.server_id}`} />

        <meta name="title" content={`${props.server.name} - Minecraft Server List`} />
        <meta
          name="description"
          content={`Find ${props.server.name}'s IP Address and Discord here! ${props.server.description}`}
        />

        <meta property="og:title" content={`${props.server.name} - Minecraft Server List`} />
        <meta
          property="og:description"
          content={`Find ${props.server.name}'s IP Address and Discord here! ${props.server.description}`}
        />
        <meta
          property="og:image"
          content={`https://api.minecraft.global/server/${props.server.server_id}/favicon`}
        />

        <meta property="twitter:title" content={`${props.server.name} - Minecraft Server List`} />
        <meta
          property="twitter:description"
          content={`Find ${props.server.name}'s IP Address and Discord here! ${props.server.description}`}
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
      <AnimatePresence>
        {reportModal && <Report showModal={showReportModal} id={props.server.server_id} />}
      </AnimatePresence>
      <div className="flex flex-col items-start justify-start w-full md:mt-6 space-y-10 md:space-y-16">
        <Header
          server_id={props.server.server_id}
          name={props.server.name}
          tags={props.server.tags}
          favicon={props.server.favicon}
          description={props.server.description}
          monthly_votes={props.server.monthly_votes}
          premium={props.server.premium}
        />
        <div className="flex flex-col items-start justify-start w-full space-y-4 md:space-y-8">
          <Navigation
            screen={screen}
            user={props.user}
            server={props.server}
            setScreen={setScreen}
            showReportModal={showReportModal}
          />
          <div className="flex flex-col md:flex-row items-start justify-start w-full space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-start justify-start w-full">
              {screen === "overview" ? (
                <Overview long_description={props.server.long_description} />
              ) : (
                <Comments server_id={props.server.server_id} user={props.user} />
              )}
            </div>
            <Sidebar {...props.server} />
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

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Report from "./modals/Report";
import Default from "ui/layouts/Default";
import Header from "./components/Header";
import Overview from "./screens/Overview";
import { GetDefaultData } from "api/core";
import Sidebar from "./components/Sidebar";
import { GetServerByID } from "api/server";
import { GetLoggedInUser } from "api/login";
import Navigation from "./components/Navigation";

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
      <AnimatePresence>
        {reportModal && <Report showModal={showReportModal} id={props.server.server_id} />}
      </AnimatePresence>
      <div className="flex flex-col items-start justify-start w-full mt-6 space-y-16">
        <Header
          server_id={props.server.server_id}
          name={props.server.name}
          tags={props.server.tags}
          favicon={props.server.favicon}
          description={props.server.description}
          monthly_votes={props.server.monthly_votes}
          premium={props.server.premium}
        />
        <div className="flex flex-col items-start justify-start w-full space-y-8">
          <Navigation screen={screen} setScreen={setScreen} showReportModal={showReportModal} />
          <div className="flex flex-row items-start justify-start w-full space-x-8">
            <div className="flex flex-col items-start justify-start w-full">
              {props.screen === "overview" ? (
                <Overview long_description={props.server.long_description} />
              ) : (
                <Overview long_description={props.server.long_description} />
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

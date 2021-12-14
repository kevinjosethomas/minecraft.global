import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Card from "./components/Card";
import Confirm from "./modals/Confirm";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

export default function Premium(props) {
  const [modal, showModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title="Premium - Minecraft Server List"
      search
    >
      <AnimatePresence>
        {modal && <Confirm user={props.user} showModal={showModal} />}
      </AnimatePresence>
      <div className="flex flex-col md:flex-row items-center justify-between w-full py-2 space-y-6 md:space-y-0">
        <div className="flex flex-col items-start justify-start w-full md:w-[700px] space-y-4">
          <motion.h1
            className="font-bold text-3xl md:text-5xl text-white text-opacity-90 max-w-xl leading-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Everything you need to grow your server. For only{" "}
            <p className="bg-gradient-to-r from-olive-600 to-olive-800 text-transparent bg-clip-text">
              $4.99
            </p>{" "}
            a month!
          </motion.h1>
          <div className="flex flex-col items-start items-start md:justify-center space-y-4">
            <motion.div
              className="flex flex-col items-start justify-center md:justify-start"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fal fa-chart-bar w-[32px] text-teal-500 text-3xl text-center" />
                <p className="text-2xl md:text-3xl text-teal-500">Server Analytics</p>
              </div>
              <p className="text-lg md:text-2xl text-white text-opacity-70">
                Premium users get a plugin that regularly transmits data from your Minecraft server
                to our website! This allows you to track various statistics including players,
                upvotes, chat messages, pageviews, impressions and more for up to 30 days!
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-start justify-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fal fa-sack-dollar w-[32px] text-yellow-500 text-3xl text-center" />
                <p className="text-2xl md:text-3xl text-yellow-500">Monthly Advertising Credit</p>
              </div>
              <p className="text-lg md:text-2xl text-white text-opacity-70">
                All Premium users get $5 worth of Advertising Credit every month! This credit can be
                used to pay for advertisements on the website via our auction system! Advertising
                Credit also carries over to the following month!
              </p>
            </motion.div>
            <motion.p
              className="text-lg md:text-xl text-white text-opacity-90"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              *Premium only applies to one Minecraft Server!
            </motion.p>
          </div>
        </div>
        <Card user={props.user} showModal={showModal} />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = GetLoggedInUser(ctx, true);
    const data = GetDefaultData(ctx);

    const responses = await Promise.all([user, data]);

    const userdata = responses[0];
    const defaultdata = responses[1];

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          user: userdata[0],
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

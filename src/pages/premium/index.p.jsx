import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Card from "./components/Card";
import Confirm from "./modals/Confirm";
import Default from "ui/layouts/Default";
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
    <Default user={props.user} title="Premium - Minecraft Server List" search>
      <AnimatePresence>
        {modal && <Confirm user={props.user} showModal={showModal} />}
      </AnimatePresence>
      <div className="flex w-full flex-col items-center justify-between space-y-6 py-2 md:flex-row md:space-y-0">
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:w-[700px]">
          <motion.h1
            className="max-w-xl text-3xl font-bold leading-tight text-white text-opacity-90 md:text-5xl"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Everything you need to grow your server. For only{" "}
            <span className="bg-gradient-to-r from-olive-600 to-olive-800 bg-clip-text text-transparent">
              $4.99
            </span>{" "}
            a month!
          </motion.h1>
          <div className="flex flex-col items-start items-start space-y-4 md:justify-center">
            <motion.div
              className="flex flex-col items-start justify-center md:justify-start"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex items-center justify-start space-x-2">
                <i className="fal fa-chart-bar w-[32px] text-center text-3xl text-teal-500" />
                <p className="text-2xl text-teal-500 md:text-3xl">
                  Server Analytics
                </p>
              </div>
              <p className="text-lg text-white text-opacity-70 md:text-2xl">
                Premium users get a plugin that regularly transmits data from
                your Minecraft server to our website! This allows you to track
                various statistics including players, upvotes, chat messages,
                pageviews, impressions and more for up to 30 days!
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-start justify-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center justify-start space-x-2">
                <i className="fal fa-sack-dollar w-[32px] text-center text-3xl text-yellow-500" />
                <p className="text-2xl text-yellow-500 md:text-3xl">
                  Monthly Advertising Credit
                </p>
              </div>
              <p className="text-lg text-white text-opacity-70 md:text-2xl">
                All Premium users get $5 worth of Advertising Credit every
                month! This credit can be used to pay for advertisements on the
                website via our auction system! Advertising Credit also carries
                over to the following month!
              </p>
            </motion.div>
            <motion.p
              className="text-lg text-white text-opacity-90 md:text-xl"
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
    const [response, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        props: {},
      };
    } else {
      return {
        props: {
          user: response,
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

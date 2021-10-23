import { motion } from "framer-motion";

import Card from "./components/Card";
import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";

export default function Premium(props) {
  return (
    <Default user={props.user}>
      <div className="flex flex-row items-center justify-between w-full py-2">
        <div className="flex flex-col items-start justify-start w-[700px] space-y-4">
          <motion.h1
            className="font-bold text-[48px] text-white text-opacity-90 max-w-xl leading-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Everything you need to grow your server. For only{" "}
            <span className="text-olive-400">$4.99</span> a month!
          </motion.h1>
          <div className="flex flex-col items-start justify-center space-y-4">
            <motion.div
              className="flex flex-col items-start justify-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fal fa-chart-bar w-[32px] text-teal-500 text-[32px] text-center" />
                <span className="text-[32px] text-teal-500">Server Analytics</span>
              </div>
              <p className="text-[24px] text-white text-opacity-70">
                Premium users get a plugin that regularly transmits data from your Minecraft server
                to our website! This allows you to track various statistics like player count,
                upvote count, memory usage and CPU usage for up to 30 days!
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-start justify-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fal fa-sack-dollar w-[32px] text-orange-700 text-[32px] text-center" />
                <span className="text-[32px] text-orange-700">Monthly Auction Credit</span>
              </div>
              <p className="text-[24px] text-white text-opacity-70">
                All Premium users get $5 worth of Auctions Credit every month! This credit can be
                used to bid for advertisements in any tag! Credit will only be used if you actually
                win the auction. Auctions Credit also carries over to the following month!
              </p>
            </motion.div>
            <motion.p
              className="text-[20px] text-white text-opacity-90"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              *Premium only applies to one Minecraft Server!
            </motion.p>
          </div>
        </div>
        <Card />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  const [response, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
    };
  }

  return {
    props: {
      user: response.payload,
    },
  };
}

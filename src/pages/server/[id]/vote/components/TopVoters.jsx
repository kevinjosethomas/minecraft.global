import moment from "moment";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { FetchServerTopVoters } from "api/upvote";

export default function TopVoters(props) {
  const [voters, setVoters] = useState(
    Array(10).fill({ minecraft_username: ". . .", vote_count: "." })
  );

  useEffect(() => {
    (async () => {
      const [response, error] = await FetchServerTopVoters(props.server_id);

      if (error) {
        toast.error("Could not fetch top voters :(");
      }

      setVoters([
        ...response.payload,
        ...Array(10 - response.payload.length).fill({
          minecraft_username: ". . .",
          vote_count: ".",
        }),
      ]);
    })();
  }, [props.upvoted]);

  return (
    <motion.div
      className="flex w-full max-w-full flex-col items-start justify-between space-y-4 rounded-xl border-2 border-olive-930 bg-olive-940 bg-opacity-80 p-4 md:h-[416px] md:space-y-0 md:p-8"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <p className="text-3xl font-medium text-white text-opacity-90">
        {moment(new Date()).format("MMM")}'s top voters
      </p>
      <div className="flex w-full flex-col items-start justify-start space-y-0.5">
        {voters.map((voter, index) => (
          <div key={index} className="flex w-full items-center justify-between">
            <p className="text-xl text-white text-opacity-80">
              {voter.minecraft_username}
            </p>
            <p className="w-[20px] text-center text-xl text-white text-opacity-80">
              {voter.vote_count}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

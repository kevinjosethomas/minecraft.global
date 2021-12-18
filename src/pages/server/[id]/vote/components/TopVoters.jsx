import moment from "moment";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GetServerTopVoters } from "api/server";

export default function TopVoters(props) {
  const [voters, setVoters] = useState(
    Array(10).fill({ minecraft_username: ". . .", vote_count: "." })
  );

  useEffect(() => {
    (async () => {
      const [response, error] = await GetServerTopVoters(props.server_id);

      if (error) {
        toast.error("Could not fetch top voters :(");
      }

      setVoters([
        ...response,
        ...Array(10 - response.length).fill({ minecraft_username: ". . .", vote_count: "." }),
      ]);
    })();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-start justify-between w-full max-w-full md:h-[416px] p-4 md:p-8 space-y-4 md:space-y-0 bg-olive-950 rounded border-2 border-olive-920"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <p className="font-medium text-3xl text-white text-opacity-90">
        {moment(new Date()).format("MMM")}'s top voters
      </p>
      <div className="flex flex-col items-start justify-start w-full space-y-0.5">
        {voters.map((voter, index) => (
          <div key={index} className="flex flex-row items-center justify-between w-full">
            <p className="text-xl text-white text-opacity-80">{voter.minecraft_username}</p>
            <p className="w-[20px] text-center text-xl text-white text-opacity-80">
              {voter.vote_count}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

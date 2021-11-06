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

      console.log(response);

      setVoters([
        ...response,
        ...Array(10 - response.length).fill({ minecraft_username: ". . .", vote_count: "." }),
      ]);
    })();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full h-[416px] p-8 bg-olive-950 rounded border-2 border-olive-920"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <span className="font-medium text-[32px] text-white text-opacity-90">
        {moment(new Date()).format("MMM")}'s top voters
      </span>
      <div className="flex flex-col items-start justify-start w-full">
        {voters.map((voter, index) => (
          <div key={index} className="flex flex-row items-center justify-between w-full">
            <span className="text-[20px] text-white text-opacity-80">
              {voter.minecraft_username}
            </span>
            <span className="w-[20px] text-center text-[20px] text-white text-opacity-80">
              {voter.vote_count}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

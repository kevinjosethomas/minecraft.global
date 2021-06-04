import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

import getServers from "../../api/servers";
import Advertisement from "../core/Advertisement";
import ServerCard, { ServerCardSkeleton } from "../core/ServerCard";

function TopServers(props) {
  const { isLoading, error, data } = useQuery(["IndexTopServers", 6, 0], () =>
    getServers(6, 0)
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 2xl:gap-5 3xl:gap-10">
        {[...Array(6)].map((el, index) => (
          <ServerCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return "ERROR";
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 2xl:gap-5 3xl:gap-10">
        {data.payload.entries.map((entry, index) => {
          if (entry.server_id) {
            if (entry.is_custom_advertisement) {
              return <ServerCard key={index} {...entry} />;
            }
            return <ServerCard key={index} {...entry} />;
          } else if (entry.advertisement_id) {
            return <Advertisement key={index} {...entry} />;
          }
        })}
      </div>
      <Link href="/servers">
        <motion.div
          className="flex flex-row items-center justify-center w-full py-8 bg-dark-70 rounded-xl cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.5 } }}
        >
          <span className="font-proxima font-semibold text-3xl lg:text-4xl text-gray-400">
            SEE MORE
          </span>
        </motion.div>
      </Link>
    </div>
  );
}

export default TopServers;

import Link from "next/link";
import { useQuery } from "react-query";

import ServerCard, { ServerCardSkeleton } from "../core/ServerCard";
import getServerList from "../../api/server/list";

function TopServers(props) {
  const { isLoading, error, data } = useQuery(["IndexTopServers", 6, 0], () =>
    getServerList(6, 0)
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-10">
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
      <div className="grid grid-cols-3 gap-10">
        {data.payload.map((server) => (
          <ServerCard key={server.server_id} {...server} />
        ))}
      </div>
      <Link href="/servers">
        <a className="flex flex-row items-center justify-center w-full py-8 bg-dark-70 rounded-xl">
          <span className="font-proxima font-semibold text-4xl text-gray-400">
            SEE MORE
          </span>
        </a>
      </Link>
    </div>
  );
}

export default TopServers;

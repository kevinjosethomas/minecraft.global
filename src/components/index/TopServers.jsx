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
    <div className="grid grid-cols-3 gap-10">
      {data.payload.map((server) => (
        <ServerCard key={server.server_id} {...server} />
      ))}
    </div>
  );
}

export default TopServers;

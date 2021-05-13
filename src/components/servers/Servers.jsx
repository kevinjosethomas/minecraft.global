import getServers from "../../api/servers";
import { useQuery } from "react-query";
import ServerCard, { ServerCardSkeleton } from "../core/ServerCard";

function Servers(props) {
  const { isLoading, error, data } = useQuery(["Servers", 12, 0], () =>
    getServers(12, 0)
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
      <div className="grid grid-cols-2 gap-10">
        {data.payload.map((server) => (
          <ServerCard key={server.server_id} {...server} />
        ))}
      </div>
    </div>
  );
}

export default Servers;

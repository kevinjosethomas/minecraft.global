import { useQuery } from "react-query";
import { useRouter } from "next/router";

import getServers from "../../api/servers";
import ServerCard, { ServerCardSkeleton } from "../core/ServerCard";

function Servers(props) {
  const router = useRouter();

  const { isLoading, error, data } = useQuery(["Servers", props.params], () =>
    getServers(props.params)
  );

  const updatePageNumber = (page) => {
    router.query.page = page;
    router.push(router);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="font-bold text-4xl text-gray-300">Servers</span>
        <div className="flex flex-row items-center justify-center space-x-4">
          {props.page > 1 ? (
            <div
              className="flex flex-row items-center justify-center w-8 h-8 bg-olive-60 rounded cursor-pointer hover:bg-olive-70 transition duration-500"
              onClick={() => updatePageNumber(props.page - 1)}
            >
              <i className="fas fa-chevron-left text-lg text-gray-300" />
            </div>
          ) : (
            <></>
          )}
          <h1 className="font-bold text-2xl text-gray-400">
            Page {props.page}
          </h1>
          <div
            className="flex flex-row items-center justify-center w-8 h-8 bg-olive-60 rounded cursor-pointer hover:bg-olive-70 transition duration-500"
            onClick={() => updatePageNumber(props.page + 1)}
          >
            <i className="fas fa-chevron-right text-lg text-gray-300" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {isLoading
          ? [...Array(6)].map((el, index) => <ServerCardSkeleton key={index} />)
          : data.payload.servers.map((server) => (
              <ServerCard key={server.server_id} {...server} />
            ))}
      </div>
    </div>
  );
}

export default Servers;

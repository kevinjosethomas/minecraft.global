import { useQuery } from "react-query";
import { useRouter } from "next/router";

import getServers from "../../api/servers";
import Advertisement from "../core/Advertisement";
import ServerCard, { ServerCardSkeleton } from "../core/ServerCard";

function Servers(props) {
  const router = useRouter();

  const updatePageNumber = (page) => {
    router.query.page = page;
    router.push(router);
  };

  const { isLoading, error, data } = useQuery(["Servers", props.params], () =>
    getServers(props.params)
  );

  if (error) {
    return "sus";
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center space-y-1">
          <span className="font-bold text-4xl text-gray-300">Servers</span>
          {data?.payload.entries.length ? (
            <span className="font-semibold text-xl text-gray-400">
              <i className="far fa-search" /> Showing{" "}
              <span className="text-olive-60">
                {data?.payload.entries.length}
              </span>{" "}
              out of{" "}
              <span className="text-olive-60">
                {data?.payload.total_records}
              </span>{" "}
              results{" "}
              {props.params.query ? (
                <span>
                  for{" "}
                  <span className="text-olive-60">{props.params.query}</span>
                </span>
              ) : (
                <></>
              )}
            </span>
          ) : (
            <></>
          )}
        </div>

        {data?.payload.entries.length ? (
          <PageNav
            page={props.page}
            onClick={(page) => updatePageNumber(page)}
          />
        ) : (
          <></>
        )}
      </div>
      {isLoading || data.payload.entries.length ? (
        <div className="grid grid-cols-2 gap-10">
          {isLoading
            ? [...Array(12)].map((el, index) => (
                <ServerCardSkeleton key={index} />
              ))
            : data.payload.entries.map((entry, index) => {
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
      ) : (
        <div className="flex flex-row items-center justify-center w-[64.5rem] py-28 space-x-10">
          <img
            src="/images/creeper-error.png"
            className="w-48 filter saturate-0"
            draggable="false"
          />
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-4xl text-gray-300">Not Found</h1>
            <span className="max-w-md font-medium text-xl text-gray-400">
              Uhh, we couldn't find any servers that match your filters{" "}
              {props.params.query ? (
                <span>
                  for{" "}
                  <span className="text-gray-300">{props.params.query}</span>
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
        </div>
      )}
      {data?.payload.entries.length ? (
        <div className="flex flex-row items-center justify-end w-full">
          <PageNav
            page={props.page}
            onClick={(page) => updatePageNumber(page)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function PageNav(props) {
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      {props.page > 1 ? (
        <div
          className="flex flex-row items-center justify-center w-8 h-8 bg-olive-60 rounded cursor-pointer hover:bg-olive-70 transition duration-500"
          onClick={() => props.onClick(props.page - 1)}
        >
          <i className="fas fa-chevron-left text-lg text-gray-300" />
        </div>
      ) : (
        <></>
      )}
      <h1 className="font-bold text-2xl text-gray-400">Page {props.page}</h1>
      <div
        className="flex flex-row items-center justify-center w-8 h-8 bg-olive-60 rounded cursor-pointer hover:bg-olive-70 transition duration-500"
        onClick={() => props.onClick(props.page + 1)}
      >
        <i className="fas fa-chevron-right text-lg text-gray-300" />
      </div>
    </div>
  );
}

export default Servers;

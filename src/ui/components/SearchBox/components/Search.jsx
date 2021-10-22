import { Fragment } from "react";

import ServerCard, { ServerCardSkeleton } from "./ServerCard";

export default function Search(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start ml-3 space-x-1.5">
        <i className="far fa-search text-[20px] text-white text-opacity-80" />
        <span className="font-medium text-[20px] text-white text-opacity-80 tracking-tight">
          {props.results ? "SEARCH RESULTS..." : "NO SERVERS FOUND :("}
        </span>
      </div>
      {props.results && <Results results={props.results} />}
    </div>
  );
}

function Results(props) {
  return (
    <div className="grid grid-cols-3 gap-5 w-full">
      {props.results?.length ? (
        <Fragment>
          {props.results.map((server) => (
            <ServerCard key={server.server_id} {...server} />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {[...Array(9)].map((el, index) => (
            <ServerCardSkeleton key={index} />
          ))}
        </Fragment>
      )}
    </div>
  );
}

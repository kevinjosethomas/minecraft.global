import { Fragment } from "react";

import ServerCard, { ServerCardSkeleton } from "./ServerCard";

export default function Search(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="ml-3 flex flex-row items-center justify-start space-x-1.5">
        <i className="far fa-search text-xl text-white text-opacity-80" />
        <p className="text-xl font-medium tracking-tight text-white text-opacity-80">
          {props.results ? (
            <Fragment>
              {props.query && props.results.length
                ? `SEARCH RESULTS FOR ${props.query}`
                : props.results.length
                ? "POPULAR MINECRAFT SERVERS"
                : "SEARCHING..."}
            </Fragment>
          ) : (
            "NO SERVERS FOUND :("
          )}
        </p>
      </div>
      {props.results && <Results results={props.results} />}
    </div>
  );
}

function Results(props) {
  return (
    <div className="grid w-full grid-cols-3 gap-5">
      {props.results?.length ? (
        <Fragment>
          {props.results.map((server) => (
            <ServerCard key={server.server_id} {...server} />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {[...Array(6)].map((el, index) => (
            <ServerCardSkeleton key={index} />
          ))}
        </Fragment>
      )}
    </div>
  );
}

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { GetSearchResults } from "api/search";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  const [results, setResults] = useState([...props.results.entries]);
  const [resultCount, setResultCount] = useState(props.results.total_records);

  const loadMore = async (page) => {
    if (results.length < page * 12) {
      return;
    }

    const [response, error] = await GetSearchResults({
      // tag: encodeURIComponent(props.tag),
      tag: props.tag,
      amount: 12,
      offset: page * 12,
      ...props.parameters,
    });

    if (error) {
      toast.error("Failed to fetch servers :(");
      return;
    }

    setResults((results) => [...results, ...response.payload.entries]);
  };

  useEffect(() => {
    setResults(props.results.entries);
    setResultCount(props.results.total_records);
  }, [props.results]);

  useEffect(() => {
    (async () => {
      const [response, error] = await GetSearchResults({
        ...props.parameters,
        tags: props.tag,
        // tags: encodeURIComponent(props.tag),
        amount: 12,
      });

      if (error) {
        toast.error("Failed to fetch servers :(");
        return;
      }

      setResultCount(response.payload.total_records);
      setResults([...response.payload.entries]);
    })();
  }, [props.parameters]);

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-3">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-3xl text-white text-opacity-90">
          {props.tag} Minecraft Servers
        </h1>
        <p className="text-xl text-white text-opacity-80">
          Showing about {resultCount} results...
        </p>
      </div>
      {results.length !== 0 ? (
        <InfiniteScroll
          className="w-full"
          pageStart={0}
          loadMore={loadMore}
          hasMore={props.results.total_records > results.length}
          loading={<Loading />}
        >
          <div className="flex w-full flex-col items-start justify-start space-y-0.5 overflow-hidden rounded-[12px]">
            {results.map((server, index) => (
              <ServerCard
                key={index}
                index={index}
                user={props.user}
                {...server}
                animate
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="!mt-10 flex w-full flex-row items-center justify-center space-x-4">
          <img
            src="/images/creeper.png"
            alt="Not Found Creeper Illustration"
            className="w-48 saturate-0 filter"
            draggable="false"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-4xl font-medium text-white text-opacity-90">
              No Results Found...
            </p>
            <p className="max-w-sm text-2xl text-white text-opacity-60">
              We couldn't find any servers that match your filters :(
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <motion.div
      className="mt-4 flex w-full flex-row items-center justify-center space-x-2 rounded-[12px] py-3"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src="/images/clock.gif"
        alt="Minecraft Clock"
        draggable="false"
        className="h-16 w-16"
      />
    </motion.div>
  );
}

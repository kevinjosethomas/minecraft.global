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
    setResults([...props.results.entries]);
    setResultCount(props.results.total_records);
  }, [props.results]);

  useEffect(() => {
    (async () => {
      const [response, error] = await GetSearchResults({
        ...props.parameters,
        amount: 12,
      });

      if (error) {
        toast.error("Failed to fetch servers :(");
        return;
      }

      setResults([...response.payload.entries]);
    })();
  }, [props.parameters]);

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-3">
      <div className="flex flex-col items-start justify-start">
        <span className="text-3xl text-white text-opacity-90">Search Results</span>
        <span className="text-xl text-white text-opacity-80">
          Showing about {resultCount} results...
        </span>
      </div>
      {results.length !== 0 ? (
        <InfiniteScroll
          className="w-full"
          pageStart={0}
          loadMore={loadMore}
          hasMore={props.results.total_records > results.length}
          loading={<Loading />}
        >
          <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
            {results.map((server, index) => (
              <ServerCard key={index} index={index} user={props.user} {...server} animate />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex flex-row items-center justify-center w-full !mt-10 space-x-4">
          <img
            src="/images/creeper.png"
            alt="Not Found Creeper Illustration"
            className="w-48 filter saturate-0"
            draggable="false"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="font-medium text-4xl text-white text-opacity-90">No Results Found...</p>
            <p className="max-w-sm text-2xl text-white text-opacity-60">
              We couldn&apos;t find any servers that match your filters :(
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
      className="flex flex-row items-center justify-center w-full py-3 mt-4 space-x-2 rounded-[12px]"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <img src="/images/clock.gif" alt="Minecraft Clock" draggable="false" className="w-16 h-16" />
    </motion.div>
  );
}

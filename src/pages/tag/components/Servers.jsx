import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { SearchByTag } from "api/search";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  const [results, setResults] = useState([...props.results.entries]);
  const [resultCount, setResultCount] = useState(props.results.total_records);

  const loadMore = async (page) => {
    const [response, error] = await SearchByTag(props.tag, 12, page * 12, props.sort);

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
      const [response, error] = await SearchByTag(props.tag, 12, 0, props.sort);

      if (error) {
        toast.error("Failed to fetch servers :(");
        return;
      }

      setResults([...response.payload.entries]);
    })();
  }, [props.sort]);

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-3">
      <div className="flex flex-col items-start justify-start">
        <span className="text-[32px] text-white text-opacity-90">
          {props.tag} Minecraft Servers
        </span>
        <span className="text-[20px] text-white text-opacity-80">
          Showing about {resultCount} results...
        </span>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={props.results.total_records > results.length}
        loading={<Loading />}
      >
        <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
          {results.map((server, index) => (
            <ServerCard key={index} index={index} {...server} animate />
          ))}
        </div>
      </InfiniteScroll>
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

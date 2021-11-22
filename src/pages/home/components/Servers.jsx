import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import tags from "lib/tags.json";
import { SearchByTag } from "api/search";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  const [canFetchmore, setCanFetchmore] = useState(true);
  const [results, setResults] = useState([
    {
      tag: null,
      name: "Popular Servers",
      description: "The most upvoted servers!",
      url: null,
      results: props.defaultResults.slice(0, 4),
    },
  ]);

  useEffect(() => {
    const tagResults = [];

    for (const tag of tags) {
      tagResults.push({
        tag: tag.name,
        name: `${tag.name} Servers`,
        description: `The most upvoted ${tag.name} servers!`,
        results: [],
      });
    }

    setResults((results) => [...results, ...tagResults]);
  }, []);

  const loadMore = async (page) => {
    if (!results[page]) {
      return;
    }
    const tag = results[page].tag;
    const resultsCopy = [...results];

    const [response, error] = await SearchByTag(tag, { amount: 4 });

    if (error) {
      toast.error("Failed to fetch servers :(");
      return;
    }

    if (!response.payload.entries.length) {
      resultsCopy.slice(page, 1);
      setResults(results);
      setCanFetchmore(false);
      return;
    }

    resultsCopy[page].results = response.payload.entries;
    setResults(resultsCopy);

    if (page + 1 === results.length) {
      setCanFetchmore(false);
    }
  };

  return (
    <InfiniteScroll
      className="w-full"
      pageStart={0}
      loadMore={loadMore}
      hasMore={canFetchmore}
      loader={<Loading />}
    >
      <div className="flex flex-col items-start justify-start w-full space-y-8 rounded-[12px] overflow-hidden">
        {results
          .filter((result) => result.results.length)
          .map((result, index) => (
            <ServerCollection key={index} user={props.user} {...result} />
          ))}
      </div>
    </InfiniteScroll>
  );
}

function ServerCollection(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2 overflow-x-hidden">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start justify-start">
          <motion.h2
            className="text-xl md:text-4xl text-white text-opacity-80 leading-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {props.name}
          </motion.h2>
          <motion.p
            className="text-xs md:text-xl text-white text-opacity-60 leading-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {props.description}
          </motion.p>
        </div>
        <Link href={props.tag ? `/tag/${props.tag}` : "/search?sort=popular"} passHref>
          <motion.a
            className="group flex flex-row items-center justify-center px-2.5 md:px-3 md:px-4 py-0.5 md:py-1 md:py-2 space-x-2 bg-olive-600 bg-opacity-25 hover:bg-opacity-50 rounded-[6px] select-none transition duration-300"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-medium text-sm md:text-lg text-white whitespace-nowrap">
              See More
            </span>
            <i className="far fa-angle-right text-lg text-white group-hover:translate-x-0.5 transform duration-300" />
          </motion.a>
        </Link>
      </div>
      <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
        {props.results.map((server, serverindex) => (
          <ServerCard
            key={server.server_id}
            user={props.user}
            index={serverindex + 3}
            {...server}
            animate
          />
        ))}
      </div>
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

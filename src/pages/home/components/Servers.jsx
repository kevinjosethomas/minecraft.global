import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import tags from "lib/tags.json";
import { GetSearchResults } from "api/search";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  const [canFetchmore, setCanFetchmore] = useState(true);
  const [results, setResults] = useState([
    {
      tag: null,
      name: "Popular Servers",
      description: "The most upvoted servers!",
      url: null,
      results: props.servers.slice(0, 4),
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

    const [response, error] = await GetSearchResults({
      tag: tag,
      amount: 4,
      track_tags: false,
    });

    if (error) {
      toast.error("Failed to fetch servers :(");
      return;
    }

    // if (!response.payload.entries.length) {
    //   resultsCopy.slice(page, 1);
    //   setResults(results);
    //   setCanFetchmore(false);
    //   return;
    // }

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
      <div className="flex w-full flex-col items-start justify-start space-y-8 overflow-hidden rounded-2xl">
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
    <div className="flex w-full flex-col items-start justify-start space-y-2 overflow-x-hidden">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-start">
          <motion.h2
            className="text-xl leading-tight text-white md:text-4xl"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {props.name}
          </motion.h2>
          <motion.p
            className="text-xs leading-tight text-white text-opacity-80 md:text-xl"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {props.description}
          </motion.p>
        </div>
        <Link
          href={props.tag ? `/tag/${props.tag}` : "/search?sort=popular"}
          passHref
        >
          <motion.a
            className="group over:bg-olive-800 duration-300md:px-3 flex select-none items-center justify-center space-x-2 rounded-lg bg-olive-900 px-2.5 py-0.5 transition md:px-4 md:py-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="whitespace-nowrap text-sm font-medium text-white md:text-lg">
              See More
            </p>
            <i className="far fa-angle-right transform text-lg text-white duration-300 group-hover:translate-x-0.5" />
          </motion.a>
        </Link>
      </div>
      <div className="flex w-full flex-col items-start justify-start space-y-0.5 overflow-hidden rounded-[12px]">
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
      className="mt-4 flex w-full items-center justify-center space-x-2 rounded-[12px] py-3"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src="/images/icons/clock.gif"
        alt="Minecraft Clock"
        draggable="false"
        className="h-16 w-16"
      />
    </motion.div>
  );
}

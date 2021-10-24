import toast from "react-hot-toast";
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
    const tag = results[page].tag;
    const resultsCopy = [...results];

    const [response, error] = await SearchByTag(tag, 4);

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
    <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={canFetchmore} loader={<Loading />}>
      <div className="flex flex-col items-start justify-start w-full space-y-8 rounded-[12px] overflow-hidden">
        {results
          .filter((result) => result.results.length)
          .map((result, index) => (
            <ServerCollection key={index} {...result} />
          ))}
      </div>
    </InfiniteScroll>
  );
}

function ServerCollection(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-col items-start justify-start">
        <h2 className="text-[40px] text-white text-opacity-80 leading-tight">{props.name}</h2>
        <p className="text-[20px] text-white text-opacity-60 leading-tight">{props.description}</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
        {props.results.map((server, serverindex) => (
          <ServerCard key={server.server_id} index={serverindex + 3} {...server} animate />
        ))}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-row items-center justify-center w-full py-3 mt-4 space-x-2 rounded-[12px]">
      <img src="/images/clock.gif" alt="Minecraft Clock" draggable="false" className="w-16 h-16" />
    </div>
  );
}

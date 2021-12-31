import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroller";

import storedTags from "lib/tags.json";

export default function Tags(props) {
  const [tags, setTags] = useState(storedTags.slice(0, 5));

  const loadMore = (page) => {
    setTimeout(() => {
      setTags(storedTags.slice(0, page));
    }, 75);
  };

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start px-4 space-x-2">
        <i className="fas fa-tags text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Popular Tags</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <InfiniteScroll
          pageStart={5}
          loadMore={loadMore}
          hasMore={tags.length !== storedTags.length}
          className="w-full"
        >
          {tags.map((tag, index) => (
            <Link key={index} href={`/tag/${tag.name}`} passHref>
              <motion.a
                className="flex flex-row items-center justify-start w-full py-1.5 space-x-2 hover:bg-white hover:bg-opacity-5 transition duration-300 rounded"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="w-8 text-center text-2xl text-white text-opacity-60">{index + 1}</p>
                <p className="text-2xl text-white text-opacity-80">{tag.name}</p>
              </motion.a>
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

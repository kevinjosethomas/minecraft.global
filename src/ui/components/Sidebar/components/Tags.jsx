import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import storedTags from "lib/tags.json";

export default function Tags(props) {
  const [maximum, setMaximum] = useState(
    props.servers != null
      ? (props.servers - 1) * 4 > storedTags.length
        ? storedTags.length
        : (props.servers - 1) * 4
      : storedTags.length
  );

  useEffect(() => {
    const newMax =
      props.servers != null
        ? (props.servers - 1) * 4 > storedTags.length
          ? storedTags.length
          : (props.servers - 1) * 4
        : storedTags.length;

    setMaximum(newMax);

    if (tags.length > newMax) {
      setTags(storedTags.slice(0, newMax < 5 ? 5 : newMax));
    }
  }, [props.servers]);

  const [tags, setTags] = useState(storedTags.slice(0, 5));

  const loadMore = (page) => {
    setTimeout(() => {
      setTags(storedTags.slice(0, page));
    }, 75);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="flex items-center justify-start space-x-2 px-4">
        <i className="fas fa-tags text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Popular Tags</p>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <InfiniteScroll
          pageStart={5}
          loadMore={loadMore}
          hasMore={tags.length < maximum}
          className="w-full"
        >
          {tags.map((tag, index) => (
            <Link key={index} href={`/tag/${tag.name}`} passHref>
              <motion.a
                className="flex w-full items-center justify-start space-x-2 rounded py-1.5 transition duration-300 hover:bg-white hover:bg-opacity-5"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="w-8 text-center text-2xl text-white text-opacity-60">
                  {index + 1}
                </p>
                <p className="text-2xl text-white text-opacity-80">
                  {tag.name}
                </p>
              </motion.a>
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

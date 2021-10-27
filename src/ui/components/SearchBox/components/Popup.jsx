import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Search from "./Search";
import tags from "lib/tags.json";

export default function Popup(props) {
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target) || props.parentNode.current.contains(e.target)) {
      return;
    }

    props.showPopup(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <motion.div
      ref={node}
      className="absolute z-30 top-[85px] left-0 flex flex-col items-start justify-start w-full p-6 space-y-6 bg-olive-980 rounded-[12px] border-2 border-olive-940"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 5, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Search results={props.results} query={props.query} />
      <Separator />
      <Tags />
    </motion.div>
  );
}

function Tags() {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start ml-3 space-x-1.5">
        <i className="far fa-tags text-[20px] text-white text-opacity-80" />
        <span className="font-medium text-[20px] text-white text-opacity-80 tracking-tight">
          FILTER BY CATEGORIES
        </span>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 mt-2">
        {tags.slice(0, 8).map((tag, index) => (
          <Link key={index} href={`/tag/${tag.name}`} passHref>
            <div className="group flex flex-row items-center justify-start space-x-1 px-3 py-0.5 bg-white bg-opacity-[0.06] hover:bg-opacity-10 rounded-[4px] cursor-pointer transition duration-300">
              <i className="far fa-hashtag text-[16px] text-olive-600" />
              <span className="text-[20px] text-white text-opacity-70 group-hover:text-opacity-80 transition duration-300">
                {tag.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-[2px] w-full bg-white bg-opacity-10" />;
}

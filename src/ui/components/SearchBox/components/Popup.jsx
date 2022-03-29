import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Search from "./Search";
import tags from "lib/tags.json";

export default function Popup(props) {
  const node = useRef();

  const handleClick = (e) => {
    if (
      node.current.contains(e.target) ||
      props.parentNode.current.contains(e.target)
    ) {
      return;
    }

    props.showPopup(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <motion.div
      ref={node}
      className="bg-blur absolute top-[90px] left-0 z-30 hidden w-full flex-col items-start justify-start space-y-6 rounded-xl border-2 border-olive-910 bg-olive-920 bg-opacity-80 p-6 md:flex"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 5, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search results={props.results} query={props.query} />
      <Separator />
      <Tags />
    </motion.div>
  );
}

function Tags() {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="ml-3 flex items-center justify-start space-x-1.5">
        <i className="far fa-tags text-xl text-white text-opacity-80" />
        <p className="text-xl font-medium tracking-tight text-white text-opacity-80">
          FILTER BY CATEGORIES
        </p>
      </div>
      <div className="mt-2 flex items-center justify-center space-x-2">
        {tags.slice(0, 8).map((tag, index) => (
          <Link key={index} href={`/tag/${tag.name}`}>
            <a className="group flex cursor-pointer items-center justify-start space-x-1 rounded-[4px] bg-white bg-opacity-[0.04] px-3 py-0.5 transition duration-300 hover:bg-opacity-[0.08]">
              <i className="far fa-hashtag text-sm text-olive-600" />
              <h3 className="text-lg text-white text-opacity-70 transition duration-300 group-hover:text-opacity-80">
                {tag.name}
              </h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-[2px] w-full bg-white bg-opacity-10" />;
}

import Link from "next/link";
import { motion } from "framer-motion";

import tags from "lib/tags.json";
import Searchbar from "./components/Searchbar";

export default function SearchBox(props) {
  return (
    <motion.div
      className={`flex w-full flex-col items-start justify-start ${
        props.header ? "!mt-0 md:!mt-[40px]" : "!mt-0"
      }`}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {props.header && <Header />}
      <Searchbar defaultResults={props.defaultResults} />
      <Tags />
    </motion.div>
  );
}

function Header() {
  return (
    <h1 className="text-lg font-bold text-white text-opacity-90 md:text-5xl">
      The y=-58 for Minecraft Servers
    </h1>
  );
}

function Tags() {
  return (
    <div className="no-scrollbar mt-2 flex w-full items-center justify-start space-x-2 overflow-auto">
      <Link href="/random">
        <a className="group flex items-center justify-start space-x-2 rounded bg-white bg-opacity-10 px-3 py-0.5 transition duration-300 hover:bg-opacity-[0.15]">
          <i className="far fa-random text-sm text-olive-600 md:text-lg" />
          <h3 className="whitespace-nowrap text-white text-opacity-70 transition duration-300 group-hover:text-opacity-80 md:text-lg">
            Random Server
          </h3>
        </a>
      </Link>
      {tags.slice(0, 8).map((tag, index) => (
        <Link key={index} href={`/tag/${tag.name}`} shallow={false}>
          <a className="group flex cursor-pointer items-center justify-start space-x-1 rounded bg-white bg-opacity-[0.06] px-3 py-0.5 transition duration-300 hover:bg-opacity-10">
            <i className="far fa-hashtag text-sm text-olive-600" />
            <h3 className="whitespace-nowrap text-white text-opacity-70 transition duration-300 group-hover:text-opacity-80 md:text-lg">
              {tag.name}
            </h3>
          </a>
        </Link>
      ))}
    </div>
  );
}

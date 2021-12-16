import Link from "next/link";
import { motion } from "framer-motion";

import tags from "lib/tags.json";
import Searchbar from "./components/Searchbar";

export default function SearchBox(props) {
  return (
    <motion.div
      className={`hidden md:flex flex-col items-start justify-start w-full ${
        !props.header && "!mt-0"
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
    <h1 className="font-bold text-5xl text-white text-opacity-90">
      The y=12 for Minecraft Servers
    </h1>
  );
}

function Tags() {
  return (
    <div className="flex flex-row items-center justify-center space-x-2 mt-2">
      <Link href="/random">
        <a className="group flex flex-row items-center justify-start space-x-2 px-3 py-0.5 bg-white bg-opacity-10 hover:bg-opacity-[0.15] rounded transition duration-300">
          <i className="far fa-random text-lg text-olive-600" />
          <h3 className="text-lg text-white text-opacity-70 group-hover:text-opacity-80 transition duration-300">
            Random Server
          </h3>
        </a>
      </Link>
      {tags.slice(0, 8).map((tag, index) => (
        <Link key={index} href={`/tag/${tag.name}`} shallow={false}>
          <a className="group flex flex-row items-center justify-start space-x-1 px-3 py-0.5 bg-white bg-opacity-[0.06] hover:bg-opacity-10 rounded cursor-pointer transition duration-300">
            <i className="far fa-hashtag text-sm text-olive-600" />
            <h3 className="text-lg text-white text-opacity-70 group-hover:text-opacity-80 transition duration-300">
              {tag.name}
            </h3>
          </a>
        </Link>
      ))}
    </div>
  );
}

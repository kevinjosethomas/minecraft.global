import Link from "next/link";
import { motion } from "framer-motion";

export default function Similar(props) {
  return (
    <motion.div
      className="flex flex-row items-center justify-between w-full h-[220px] bg-olive-950 overflow-hidden rounded border-2 border-olive-920"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <div className="flex flex-col items-start justify-between h-full p-8">
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-start space-x-2">
            <p className="inline text-3xl text-white text-opacity-80">Find similar</p>
            <Link href={`/tag/${props.tag}`}>
              <a className="group flex flex-row items-center justify-start space-x-1.5 px-2.5 py-0.5 bg-white bg-opacity-[0.06] hover:bg-opacity-10 rounded-[4px] cursor-pointer transition duration-300">
                <i className="far fa-hashtag text-base text-olive-600" />
                <p className="text-xl text-white text-opacity-70 group-hover:text-opacity-80 transition duration-300">
                  {props.tag}
                </p>
              </a>
            </Link>
            <p className="inline text-3xl text-white text-opacity-80">servers</p>
          </div>
          <p className="max-w-md text-xl text-white text-opacity-80 leading-tight">
            Browse through hundreds of similar Minecraft servers to play on!
          </p>
        </div>
        <Link href={`/tag/${props.tag}`}>
          <a className="group flex flex-row items-center justify-center px-4 py-2 space-x-2 bg-olive-600 bg-opacity-25 hover:bg-opacity-50 rounded-[6px] select-none transition duration-300">
            <p className="font-medium text-lg text-white">See More</p>
            <i className="far fa-angle-right text-lg text-white group-hover:translate-x-0.5 transform duration-300" />
          </a>
        </Link>
      </div>
      <img src="/images/servers.png" alt="servers" draggable="false" className="-rotate-6" />
    </motion.div>
  );
}

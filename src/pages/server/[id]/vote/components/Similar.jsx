import Link from "next/link";
import { motion } from "framer-motion";

export default function Similar(props) {
  return (
    <motion.div
      className="hidden h-[220px] w-full items-center justify-between overflow-hidden rounded border-2 border-olive-920 bg-olive-950 md:flex"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <div className="flex h-full flex-col items-start justify-between p-8">
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center justify-start space-x-2">
            <p className="inline text-3xl text-white text-opacity-80">
              Find similar
            </p>
            <Link href={`/tag/${props.tag}`}>
              <a className="group flex cursor-pointer items-center justify-start space-x-1.5 rounded-[4px] bg-white bg-opacity-[0.06] px-2.5 py-0.5 transition duration-300 hover:bg-opacity-10">
                <i className="far fa-hashtag text-base text-olive-600" />
                <p className="text-xl text-white text-opacity-70 transition duration-300 group-hover:text-opacity-80">
                  {props.tag}
                </p>
              </a>
            </Link>
            <p className="inline text-3xl text-white text-opacity-80">
              servers
            </p>
          </div>
          <p className="max-w-md text-xl leading-tight text-white text-opacity-80">
            Browse through hundreds of similar Minecraft servers to play on!
          </p>
        </div>
        <Link href={`/tag/${props.tag}`}>
          <a className="group flex select-none items-center justify-center space-x-2 rounded-[6px] bg-olive-600 bg-opacity-25 px-4 py-2 transition duration-300 hover:bg-opacity-50">
            <p className="text-lg font-medium text-white">See More</p>
            <i className="far fa-angle-right transform text-lg text-white duration-300 group-hover:translate-x-0.5" />
          </a>
        </Link>
      </div>
      <img
        src="/images/servers.png"
        alt="servers"
        draggable="false"
        className="-rotate-6"
      />
    </motion.div>
  );
}

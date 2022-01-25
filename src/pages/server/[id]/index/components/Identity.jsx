import Link from "next/link";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import Tags from "./Tags";
import Favicon from "./Favicon";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Identity(props) {
  return (
    <motion.div
      className="flex max-w-full flex-col items-start justify-start space-y-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ReactTooltip
        effect="solid"
        className="!rounded-md !border-2 !border-olive-930 !bg-olive-800 !text-white !text-opacity-90"
      />
      <div className="!mt-0 flex flex-col items-start justify-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <Favicon name={props.name} favicon={props.favicon} />
        <div className="flex items-center justify-start space-x-2 md:space-x-4">
          <h1 className="text-3xl font-medium text-white text-opacity-90 md:text-4xl">
            {props.name}
          </h1>
          {props.premium && (
            <Link href="/premium" passHref>
              <i
                className="fad fa-diamond cursor-pointer text-3xl text-olive-500 md:text-4xl"
                data-tip="Premium Server"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h4 className="max-w-2xl text-lg leading-tight text-white text-opacity-70 md:text-xl">
          {props.description}
        </h4>
      </div>
      <Tags tags={props.tags} />
    </motion.div>
  );
}

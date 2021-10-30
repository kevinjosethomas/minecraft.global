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
    <Fragment>
      <ReactTooltip
        effect="solid"
        className="!bg-olive-800 !border-2 !border-olive-930 !text-white !text-opacity-90 !rounded-md"
      />
      <motion.div
        className="flex flex-col items-start justify-start space-y-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-row items-center justify-start space-x-4">
          <Favicon name={props.name} favicon={props.favicon} />
          <h1 className="font-medium text-[42px] text-white text-opacity-90">{props.name}</h1>
          {props.premium && (
            <Link href="/premium" passHref>
              <i
                className="fad fa-diamond text-[42px] text-olive-500 cursor-pointer"
                data-tip="Premium Server"
              />
            </Link>
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <h4 className="text-[20px] text-white text-opacity-70 max-w-2xl leading-tight">
            {props.description}
          </h4>
        </div>
        <Tags tags={props.tags} />
      </motion.div>
    </Fragment>
  );
}

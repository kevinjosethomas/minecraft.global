import { motion } from "framer-motion";

import Tags from "./Tags";
import Favicon from "./Favicon";

export default function Identity(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start space-y-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-row items-center justify-start space-x-4">
        <Favicon name={props.name} favicon={props.favicon} />
        <h1 className="font-medium text-[42px] text-white text-opacity-90">{props.name}</h1>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h4 className="text-[20px] text-white text-opacity-70 max-w-2xl leading-tight">
          {props.description}
        </h4>
      </div>
      <Tags tags={props.tags} />
    </motion.div>
  );
}

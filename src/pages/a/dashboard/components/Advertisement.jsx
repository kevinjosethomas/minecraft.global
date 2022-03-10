import moment from "moment";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Analytics from "../modals/Analytics";

export default function Advertisement(props) {
  const [modal, showModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <motion.div
      className="flex w-full flex-col items-center space-y-4 overflow-hidden rounded-lg rounded-lg border-2 border-olive-940 bg-olive-950 pb-4 md:h-32 md:flex-row md:space-y-0 md:space-x-5 md:pb-0 md:pr-10"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 + 0.1 * props.index }}
    >
      <AnimatePresence>
        {modal && <Analytics {...props} showModal={showModal} />}
      </AnimatePresence>
      <div className="!ml-0 flex w-full items-center justify-center bg-olive-500 py-4 md:h-32 md:w-32 md:py-0">
        <i
          className={`${
            props.location === "home"
              ? "far fa-home-alt"
              : "far fa-arrow-alt-up"
          } text-4xl text-olive-930`}
        />
      </div>
      <div className="flex flex-col items-center md:w-[22%] md:items-start">
        <p className="select-none text-lg font-medium text-white text-opacity-70">
          PRODUCT
        </p>
        <p className="text-2xl text-white">{props.name}</p>
      </div>
      <div className="flex flex-col items-center md:w-[22%] md:items-start">
        <p className="select-none text-lg font-medium text-white text-opacity-70">
          LOCATION
        </p>
        <p className="text-2xl capitalize text-white">{props.location} Page</p>
      </div>
      <div className="flex flex-col items-center md:w-[25%] md:items-start">
        <p className="select-none text-lg font-medium text-white text-opacity-70">
          DURATION
        </p>
        <p className="text-2xl capitalize text-white">
          {moment(props.starts_at).local().format("MMM Do")} -{" "}
          {moment(props.starts_at).local().add(7, "days").format("MMM Do")}
        </p>
      </div>
      {new Date(props.starts_at) < new Date() && (
        <div
          className="flex cursor-pointer items-center space-x-2 rounded-lg bg-olive-800 px-5 py-2 transition duration-300 hover:bg-olive-900"
          onClick={() => showModal(true)}
        >
          <i className="far fa-eye text-lg text-white" />
          <p className="whitespace-nowrap text-lg text-white">See Analytics</p>
        </div>
      )}
    </motion.div>
  );
}

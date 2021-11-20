import { motion, AnimateSharedLayout } from "framer-motion";

import Options from "./Options";

export default function Navigation(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full select-none"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center justify-start space-x-10">
          <AnimateSharedLayout>
            <Screen
              label="Overview"
              active={props.screen === "overview"}
              onClick={() => props.setScreen("overview")}
            />
            <Screen
              label="Comments"
              active={props.screen === "comments"}
              onClick={() => props.setScreen("comments")}
            />
          </AnimateSharedLayout>
        </div>
        <Options user={props.user} server={props.server} showReportModal={props.showReportModal} />
      </div>
      <div className="w-full h-[3px] bg-white bg-opacity-10" />
    </motion.div>
  );
}

function Screen(props) {
  return (
    <div
      className="relative flex flex-row items-center justify-start cursor-pointer"
      onClick={props.onClick}
    >
      <span
        className={`px-2 text-3xl text-white ${
          props.active
            ? "text-opacity-80"
            : "text-opacity-60 hover:text-opacity-80 transition duration-300"
        }`}
      >
        {props.label}
      </span>
      {props.active && (
        <motion.div
          layoutId="underline"
          className="highlight-underline absolute w-full h-[3px] bg-olive-600"
        />
      )}
    </div>
  );
}

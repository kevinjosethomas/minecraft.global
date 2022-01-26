import { motion, AnimateSharedLayout } from "framer-motion";

export default function Navigation(props) {
  return (
    <motion.div
      className="flex w-full select-none flex-col items-start justify-start"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start space-x-4 md:space-x-10">
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
      </div>
      <div className="h-[3px] w-full bg-white bg-opacity-10" />
    </motion.div>
  );
}

function Screen(props) {
  return (
    <div
      className="relative flex cursor-pointer items-center justify-start"
      onClick={props.onClick}
    >
      <p
        className={`px-1 text-2xl text-white md:px-2 md:text-3xl ${
          props.active
            ? "text-opacity-80"
            : "text-opacity-60 transition duration-300 hover:text-opacity-80"
        }`}
      >
        {props.label}
      </p>
      {props.active && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-[-3px] h-[3px] w-full bg-olive-600 md:bottom-[-4.5px]"
        />
      )}
    </div>
  );
}

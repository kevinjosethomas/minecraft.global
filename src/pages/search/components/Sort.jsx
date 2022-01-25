import { motion, AnimateSharedLayout } from "framer-motion";

export default function Sort(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-1">
      <motion.p
        className="text-3xl font-medium text-white text-opacity-90"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Sort By
      </motion.p>
      <motion.div
        className="flex items-center justify-center rounded-full bg-white bg-opacity-5 transition duration-500 hover:bg-opacity-10"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <AnimateSharedLayout>
          <Option
            label="Upvotes"
            icon="far fa-arrow-alt-up"
            onClick={() =>
              props.setParameters((p) => ({ ...p, sort: "upvotes" }))
            }
            active={props.parameters.sort === "upvotes"}
          />
          <Option
            label="Players"
            icon="far fa-stars"
            onClick={() =>
              props.setParameters((p) => ({ ...p, sort: "players" }))
            }
            active={props.parameters.sort === "players"}
          />
        </AnimateSharedLayout>
      </motion.div>
    </div>
  );
}

function Option(props) {
  return (
    <div
      className="relative flex flex h-[48px] w-[160px] cursor-pointer items-center justify-center rounded-full"
      onClick={props.onClick}
    >
      <div className="z-20 flex w-full select-none items-center justify-center space-x-2">
        <i className={`${props.icon} text-2xl text-white text-opacity-80`} />
        <p className="text-2xl text-white text-opacity-80">{props.label}</p>
      </div>
      {props.active && (
        <motion.div
          layoutId="highlight"
          className="absolute z-10 h-[48px] w-[160px] rounded-full bg-olive-800"
          transition={{
            type: "spring",
            stiffness: 60,
          }}
        />
      )}
    </div>
  );
}

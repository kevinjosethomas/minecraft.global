import { motion, AnimateSharedLayout } from "framer-motion";

export default function Sort(props) {
  return (
    <div className="flex w-full w-full items-center justify-between">
      <i className="fas fa-sort text-3xl text-white text-opacity-90" />
      <motion.div
        className="flex items-center justify-between rounded-full bg-white bg-opacity-5 transition duration-500 hover:bg-opacity-10"
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
            icon="far fa-users"
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
      className="relative flex h-[48px] w-[180px] cursor-pointer items-center justify-center rounded-full"
      onClick={props.onClick}
    >
      <div className="z-20 flex w-full select-none items-center justify-center space-x-2">
        <i className={`${props.icon} text-2xl text-white text-opacity-90`} />
        <p className="text-2xl text-white text-opacity-90">{props.label}</p>
      </div>
      {props.active && (
        <motion.div
          layoutId="highlight"
          className="absolute z-10 h-[48px] w-[180px] rounded-full bg-olive-800"
          transition={{
            type: "spring",
            // stiffness: 10,
            duration: 0.5,
          }}
        />
      )}
    </div>
  );
}

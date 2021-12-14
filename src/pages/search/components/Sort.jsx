import { motion, AnimateSharedLayout } from "framer-motion";

export default function Sort(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-1">
      <motion.p
        className="font-medium text-3xl text-white text-opacity-90"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Sort By
      </motion.p>
      <motion.div
        className="flex flex-row items-center justify-center bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full transition duration-500"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <AnimateSharedLayout>
          <Option
            label="Upvotes"
            icon="far fa-arrow-alt-up"
            onClick={() => props.setParameters((p) => ({ ...p, sort: "upvotes" }))}
            active={props.parameters.sort === "upvotes"}
          />
          <Option
            label="Players"
            icon="far fa-stars"
            onClick={() => props.setParameters((p) => ({ ...p, sort: "players" }))}
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
      className="relative flex flex flex-row items-center justify-center w-[160px] h-[48px] rounded-full cursor-pointer"
      onClick={props.onClick}
    >
      <div className="z-20 flex flex-row items-center justify-center w-full select-none space-x-2">
        <i className={`${props.icon} text-2xl text-white text-opacity-80`} />
        <p className="text-2xl text-white text-opacity-80">{props.label}</p>
      </div>
      {props.active && (
        <motion.div
          layoutId="highlight"
          className="absolute z-10 w-[160px] h-[48px] bg-olive-800 rounded-full"
          transition={{
            type: "spring",
            stiffness: 60,
          }}
        />
      )}
    </div>
  );
}

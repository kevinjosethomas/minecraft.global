import moment from "moment";
import { motion } from "framer-motion";

export default function Advertisement(props) {
  return (
    <motion.div
      className="flex h-32 w-full items-center space-x-5 overflow-hidden rounded-lg rounded-lg border-2 border-olive-940 bg-olive-950 pr-10"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 + 0.1 * props.index }}
    >
      <div className="flex h-32 w-32 items-center justify-center bg-olive-500">
        <i
          className={`${
            props.location === "home"
              ? "far fa-home-alt"
              : "far fa-arrow-alt-up"
          } text-4xl text-olive-930`}
        />
      </div>
      <div className="flex w-[22%] flex-col">
        <p className="select-none text-lg font-medium text-white text-opacity-70">
          PRODUCT
        </p>
        <p className="text-2xl text-white">{props.name}</p>
      </div>
      <div className="flex w-[22%] flex-col">
        <p className="select-none text-lg font-medium text-white text-opacity-70">
          LOCATION
        </p>
        <p className="text-2xl capitalize text-white">{props.location} Page</p>
      </div>
      <div className="flex w-[25%] flex-col">
        <p className="select-none text-lg font-medium text-white text-opacity-70">
          DURATION
        </p>
        <p className="text-2xl capitalize text-white">
          {moment(props.starts_at).local().format("MMM Do")} -{" "}
          {moment(props.starts_at).local().add(7, "days").format("MMM Do")}
        </p>
      </div>
      {new Date(props.starts_at) < new Date() && (
        <div className="flex cursor-pointer items-center space-x-2 rounded-lg bg-olive-800 px-5 py-2 transition duration-300 hover:bg-olive-900">
          <i className="far fa-eye text-lg text-white" />
          <p className="whitespace-nowrap text-lg text-white">See Analytics</p>
        </div>
      )}
    </motion.div>
  );
}

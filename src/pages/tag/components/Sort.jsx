import { motion, AnimateSharedLayout } from "framer-motion";

export default function Sort(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-1">
      <span className="font-medium text-[32px] text-white text-opacity-90">Sort By</span>
      <div className="flex flex-row items-center justify-center bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full transition duration-500">
        <AnimateSharedLayout>
          <Option
            label="Upvotes"
            icon="far fa-arrow-alt-up"
            onClick={() => props.setSort("upvotes")}
            active={props.sort === "upvotes"}
          />
          <Option
            label="Players"
            icon="far fa-stars"
            onClick={() => props.setSort("players")}
            active={props.sort === "players"}
          />
        </AnimateSharedLayout>
      </div>
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
        <i className={`${props.icon} text-[24px] text-white text-opacity-80`} />
        <span className="text-[24px] text-white text-opacity-80">{props.label}</span>
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

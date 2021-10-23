import { motion } from "framer-motion";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  return (
    <div className="flex flex-row items-start justify-center w-full space-x-8">
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <motion.h2
          className="font-medium text-[40px] text-white text-opacity-90"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {props.name}&apos;s servers
        </motion.h2>
        <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
          {props.servers.map((server, index) => (
            <ServerCard key={index} index={index + 3} {...server} animate />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px]"></div>
    </div>
  );
}

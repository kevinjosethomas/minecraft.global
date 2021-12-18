import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function Overview(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ReactMarkdown className="long-description format-links w-full text-lg md:text-xl text-white text-opacity-80 whitespace-pre-wrap overflow-x-hidden">
        {props.long_description}
      </ReactMarkdown>
    </motion.div>
  );
}

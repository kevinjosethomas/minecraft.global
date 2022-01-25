import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function Overview(props) {
  return (
    <motion.div
      className="flex w-full flex-col items-start justify-start"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ReactMarkdown className="long-description format-links w-full overflow-x-hidden whitespace-pre-wrap text-lg text-white text-opacity-80 md:text-xl">
        {props.long_description}
      </ReactMarkdown>
    </motion.div>
  );
}

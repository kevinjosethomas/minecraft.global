import { motion } from "framer-motion";

export default function Comments(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-col items-start justify-start w-full"></div>
    </motion.div>
  );
}

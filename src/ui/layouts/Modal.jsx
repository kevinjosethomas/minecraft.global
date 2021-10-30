import { motion } from "framer-motion";

export default function Modal(props) {
  return (
    <motion.div
      className="z-50 fixed top-0 left-0 flex flex-row items-center justify-center w-screen h-screen bg-black bg-opacity-80"
      onClick={() => props.showModal(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
}

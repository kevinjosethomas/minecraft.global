import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Modal(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 !m-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80"
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

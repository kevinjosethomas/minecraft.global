import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Search from "./Search";

export default function Popup(props) {
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target) || props.parentNode.current.contains(e.target)) {
      return;
    }

    props.showPopup(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <motion.div
      ref={node}
      className="absolute z-30 top-[85px] left-0 flex flex-col items-start justify-start w-full p-6 bg-olive-980 rounded-[12px] border-2 border-olive-940"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 5, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Search results={props.results} query={props.query} />
    </motion.div>
  );
}

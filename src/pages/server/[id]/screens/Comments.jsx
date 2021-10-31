import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GetServerCommentsByID } from "api/server";
import PostComment from "../components/PostComment";

export default function Comments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <PostComment id={props.server_id} />
        <div className="w-full h-[3px] bg-white bg-opacity-10" />
      </div>
    </motion.div>
  );
}

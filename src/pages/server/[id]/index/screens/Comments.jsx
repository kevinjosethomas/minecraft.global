import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import CommentsList from "../components/Comments";
import { FetchServerComments } from "api/comment";
import PostComment from "../components/PostComment";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    (async () => {
      const [response, error] = await FetchServerComments(props.server_id);

      if (error) {
        toast.error("Could not fetch comments, please try again later!");
        return;
      }

      for (const comment of response.payload) {
        if (comment.user_id === props.user?.user_id) {
          setCommented(true);
        }
      }

      setComments(response.payload);
    })();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        {!commented && props.user && (
          <Fragment>
            <PostComment id={props.server_id} />
            <div className="w-full h-[3px] bg-white bg-opacity-10" />
          </Fragment>
        )}
        <CommentsList server_id={props.server_id} comments={comments} user={props.user} />
      </div>
    </motion.div>
  );
}

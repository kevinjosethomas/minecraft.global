import cookies from "js-cookie";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { PostComment } from "api/server";

export default function Comments(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <PostServerComment id={props.server_id} />
        <div className="w-full h-[3px] bg-white bg-opacity-10" />
      </div>
    </motion.div>
  );
}

function PostServerComment(props) {
  const [content, setContent] = useState("");

  const submit = async () => {
    if (content.length < 50) {
      toast.error("Your comment must be over 50 characters!");
      return;
    }
    if (content.length > 500) {
      toast.error("Your comment must not be over 500 characters!");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await PostComment(props.id, content, token);

    if (error) {
      if (error.response?.status === 401) {
        toast.error("Please login and try again!");
      } else if (error.response?.status === 409) {
        toast.error("You have already commented on this server!");
      } else {
        toast.error("An unknown error occurred!");
      }
      return;
    }

    toast.success("Successfully posted your comment!");
  };

  const onContentChange = (e) => {
    setContent(e.target.value.substring(0, 500));
  };

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="fas fa-comment-edit text-[32px] text-white" />
        <span className="text-[32px] text-white">Write a Comment</span>
      </div>
      <textarea
        className="w-full h-[150px] p-2 text-[20px] text-white text-opacity-80 bg-olive-940 resize-none border-2 border-olive-920 rounded focus:outline-none"
        value={content}
        onChange={onContentChange}
      />
      <div className="flex flex-row items-center justify-end w-full">
        <div
          className="flex flex-row items-center justify-center px-6 py-2 bg-olive-800 rounded cursor-pointer hover:bg-olive-900 transition duration-300"
          onClick={submit}
        >
          <span className="text-[20px] text-white">Post</span>
        </div>
      </div>
    </div>
  );
}

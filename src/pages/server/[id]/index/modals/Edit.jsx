import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Modal from "ui/layouts/Modal";
import { EditServerComment } from "api/comment";

export default function Edit(props) {
  const router = useRouter();
  const [content, setContent] = useState(props.content);

  const onCommentChange = (e) => {
    setContent(e.target.value.substring(0, 500));
  };

  const submit = async () => {
    if (content === props.content) {
      toast.error("You literally didn't change anything!");
      return;
    }

    if (content.length < 5) {
      toast.error("Your comment must be at least 5 characters!");
      return;
    }
    if (content.length > 500) {
      toast.error("Your comment must not be over 500 characters!");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await EditServerComment(
      props.comment_id,
      props.server_id,
      content,
      token
    );

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("Please login as the comment editor and try again!");
          break;
        case 404:
          toast.error("Unable to find the comment to edit!");
          break;
        default:
          toast.error("An unknown error occurred! Please try again later!");
          break;
      }
      return;
    }

    router.reload();
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex w-[900px] flex-col items-start justify-start space-y-2 rounded-lg border-2 border-olive-940 bg-olive-950 p-8"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="select-none text-4xl font-medium text-white text-opacity-80">
          Edit Your Comment
        </p>
        <textarea
          value={content}
          onChange={onCommentChange}
          className="focus:outline-none h-40 w-full resize-none rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5 p-3 text-xl text-white text-opacity-80"
        />
        <div className="flex w-full items-center justify-end space-x-2">
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-red-900 px-4 py-1.5 transition duration-300 hover:bg-red-800"
            onClick={() => props.showModal(false)}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Cancel
            </p>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-olive-900 px-4 py-1.5 transition duration-300 hover:bg-olive-800"
            onClick={submit}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Submit
            </p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

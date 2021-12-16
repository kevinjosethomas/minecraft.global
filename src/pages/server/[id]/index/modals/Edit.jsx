import { useState } from "react";
import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";

export default function Edit(props) {
  const [content, setContent] = useState(props.content);

  const onCommentChange = (e) => {
    setContent(e.target.value.substring(0, 500));
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col items-start justify-start w-[900px] p-8 space-y-2 bg-olive-950 rounded-lg border-2 border-olive-940"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="font-medium text-4xl text-white text-opacity-80 select-none">
          Edit Your Comment
        </p>
        <textarea
          value={content}
          onChange={onCommentChange}
          className="w-full h-40 p-3 text-xl text-white text-opacity-80 resize-none bg-white bg-opacity-5 border-2 border-white border-opacity-10 focus:outline-none rounded-lg"
        />
        <div className="flex flex-row items-center justify-end w-full space-x-2">
          <div
            className="flex flex-row items-center justify-center px-4 py-1.5 bg-red-900 hover:bg-red-800 rounded cursor-pointer transition duration-300"
            onClick={() => props.showModal(false)}
          >
            <p className="text-xl text-white text-opacity-90 select-none">Cancel</p>
          </div>
          <div className="flex flex-row items-center justify-center px-4 py-1.5 bg-olive-900 hover:bg-olive-800 rounded cursor-pointer transition duration-300">
            <p className="text-xl text-white text-opacity-90 select-none">Submit</p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

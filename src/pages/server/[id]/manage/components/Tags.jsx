import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import TagsModal from "ui/components/TagsModal/Tags";

export default function Tags(props) {
  const [modal, showModal] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between w-full space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">Server Tags</p>
        <p className="text-lg text-white text-opacity-60 leading-tight">
          Select up to 5 tags that apply to your server
        </p>
      </div>
      <div className="flex flex-col items-start justify-start min-w-[450px]">
        <AnimatePresence>
          {modal && (
            <TagsModal
              showModal={showModal}
              tags={props.tags}
              setTags={props.setDetails}
              limit={5}
            />
          )}
        </AnimatePresence>
        <div
          className="flex flex-row items-center justify-center py-2 px-6 bg-olive-700 hover:bg-olive-800 rounded-full cursor-pointer transition duration-300"
          onClick={() => showModal(true)}
        >
          <p className="text-xl text-white select-none">Choose Tags</p>
        </div>
      </div>
    </div>
  );
}

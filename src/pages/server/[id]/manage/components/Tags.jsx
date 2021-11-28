import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import TagsModal from "ui/components/TagsModal/Tags";

export default function Tags(props) {
  const [modal, showModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <div className="flex flex-row items-start justify-between w-full space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">Server Tags</p>
        <p className="text-lg text-white text-opacity-60 leading-tight">
          Select up to 5 tags that apply
        </p>
      </div>
      <div className="flex flex-col items-start justify-start min-w-[450px] max-w-[450px]">
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
        <div className="flex flex-row flex-wrap items-center justify-start mt-2">
          {props.tags.map((tag, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center mr-2 mb-2 px-2 py-0.5 bg-white cursor-pointer bg-opacity-10 hover:bg-opacity-[0.15] rounded transition duration-300"
              onClick={() =>
                props.setDetails((d) => ({ ...d, tags: d.tags.filter((t) => t !== tag) }))
              }
            >
              <p className="text-sm text-white select-none whitespace-nowrap">{tag}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

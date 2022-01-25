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
    <div className="flex w-full items-start justify-between space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">Server Tags</p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          Select up to 5 tags that apply
        </p>
      </div>
      <div className="flex min-w-[450px] max-w-[450px] flex-col items-start justify-start">
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
          className="flex cursor-pointer items-center justify-center rounded-full bg-olive-700 py-2 px-6 transition duration-300 hover:bg-olive-800"
          onClick={() => showModal(true)}
        >
          <p className="select-none text-xl text-white">Choose Tags</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-start">
          {props.tags.map((tag, index) => (
            <div
              key={index}
              className="mr-2 mb-2 flex cursor-pointer items-center justify-center rounded bg-white bg-opacity-10 px-2 py-0.5 transition duration-300 hover:bg-opacity-[0.15]"
              onClick={() =>
                props.setDetails((d) => ({
                  ...d,
                  tags: d.tags.filter((t) => t !== tag),
                }))
              }
            >
              <p className="select-none whitespace-nowrap text-sm text-white">
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

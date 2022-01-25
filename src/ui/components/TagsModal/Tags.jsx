import { motion } from "framer-motion";

import Tag from "./components/Tag";
import Modal from "ui/layouts/Modal";
import categories from "lib/categories.json";

export default function TagsModal(props) {
  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex h-[700px] w-[1200px] flex-col items-start justify-start space-y-6 overflow-y-auto rounded-md border-2 border-olive-930 bg-olive-950 p-10"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-5xl font-medium text-white text-opacity-90">
            Choose Tags
          </p>
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-olive-930 px-4 py-1 transition duration-300 hover:bg-olive-920"
            onClick={() => props.showModal(false)}
          >
            <p className="select-none text-xl font-medium text-white text-opacity-90">
              Go Back
            </p>
          </div>
        </div>
        <div className="h-1 w-full bg-white bg-opacity-10" />
        <div className="flex h-full w-full flex-col items-start justify-between">
          {categories.map((category, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-start justify-start space-y-4"
            >
              <p className="text-4xl text-white text-opacity-80">
                {category.label}
              </p>
              <div className="flex w-full flex-wrap items-center justify-start">
                {category.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    limit={props.limit}
                    tags={props.tags}
                    setTags={props.setTags}
                    {...tag}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Modal>
  );
}

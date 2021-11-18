import { motion } from "framer-motion";

import Tag from "./components/Tag";
import Modal from "ui/layouts/Modal";
import categories from "lib/categories.json";

export default function TagsModal(props) {
  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col items-start justify-start w-[1200px] h-[700px] p-10 space-y-6 bg-olive-950 border-2 border-olive-930 rounded-md overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-medium text-5xl text-white text-opacity-90">Choose Tags</p>
          <div
            className="flex flex-row items-center justify-center px-4 py-1 bg-olive-930 hover:bg-olive-920 rounded cursor-pointer transition duration-300"
            onClick={() => props.showModal(false)}
          >
            <p className="font-medium text-xl text-white text-opacity-90 select-none">Go Back</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 w-full h-1" />
        <div className="flex flex-col items-start justify-between w-full h-full">
          {categories.map((category, i) => (
            <div key={i} className="flex flex-col items-start justify-start w-full space-y-4">
              <p className="text-4xl text-white text-opacity-80">{category.label}</p>
              <div className="flex flex-row items-center justify-start w-full flex-wrap">
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

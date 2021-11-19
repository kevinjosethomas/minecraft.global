import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";

export default function Delete(props) {
  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col items-start justify-between w-[800px] h-[350px] p-10 bg-olive-950 border-2 border-olive-930 rounded-md overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col items-start justify-start space-y-4">
          <p className="font-medium text-4xl text-white text-opacity-90">
            It&apos;s sad to see you go :(
          </p>
          <p className="max-w-lg text-xl text-white text-opacity-80">
            Keep in mind, this process is irreversible. All your server data, upvotes and tokens
            will be permanently deleted!
          </p>
        </div>
        <div
          className="flex flex-row items-center justify-center space-x-4"
          onClick={() => props.showModal(false)}
        >
          <div className="flex flex-row items-center justify-center px-8 py-3 bg-olive-900 hover:bg-olive-800 rounded cursor-pointer transition duration-300">
            <p className="font-medium text-3xl text-white text-opacity-90 select-none">Go Back</p>
          </div>
          <div className="flex flex-row items-center justify-center px-8 py-3 bg-red-900 hover:bg-red-800 rounded cursor-pointer transition duration-300">
            <p className="font-medium text-3xl text-white text-opacity-90 select-none">Confirm</p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

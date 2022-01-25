import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";

export default function Delete(props) {
  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex h-[350px] w-[800px] flex-col items-start justify-between overflow-y-auto rounded-md border-2 border-olive-930 bg-olive-950 p-10"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col items-start justify-start space-y-4">
          <p className="text-4xl font-medium text-white text-opacity-90">
            It&apos;s sad to see you go :(
          </p>
          <p className="max-w-lg text-xl text-white text-opacity-80">
            Keep in mind, this process is irreversible. All your server data,
            upvotes and tokens will be permanently deleted!
          </p>
        </div>
        <div
          className="flex items-center justify-center space-x-4"
          onClick={() => props.showModal(false)}
        >
          <div className="flex cursor-pointer items-center justify-center rounded bg-olive-900 px-8 py-3 transition duration-300 hover:bg-olive-800">
            <p className="select-none text-3xl font-medium text-white text-opacity-90">
              Go Back
            </p>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-red-900 px-8 py-3 transition duration-300 hover:bg-red-800"
            onClick={props.submit}
          >
            <p className="select-none text-3xl font-medium text-white text-opacity-90">
              Confirm
            </p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

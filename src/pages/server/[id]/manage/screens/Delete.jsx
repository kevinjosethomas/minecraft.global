import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import DeleteModal from "../components/Delete";

export default function Delete(props) {
  const [modal, showModal] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-6">
      <AnimatePresence>{modal && <DeleteModal showModal={showModal} />}</AnimatePresence>
      <div className="flex flex-col items-start justify-start !mt-0 space-y-2">
        <p className="font-medium text-3xl text-white text-opacity-90">
          Are you sure you want to delete your server?
        </p>
        <p className="max-w-x text-lg text-white text-opacity-80">
          This process is irreversible. All your server data, upvotes and tokens will be permanently
          deleted!
        </p>
      </div>
      <div
        className="flex flex-row items-center justify-center px-6 py-2 bg-red-900 hover:bg-red-800 rounded cursor-pointer transition duration-300"
        onClick={() => showModal(true)}
      >
        <p className="font-medium text-2xl text-white text-opacity-90 select-none">Delete Server</p>
      </div>
    </div>
  );
}

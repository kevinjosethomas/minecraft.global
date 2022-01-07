import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import CancelPremium from "../modals/CancelPremium";

export default function CancelPremiumButton(props) {
  const [modal, showModal] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <AnimatePresence>
        {modal && <CancelPremium showModal={showModal} server={props.server} />}
      </AnimatePresence>
      <div
        className="flex flex-row items-center justify-center w-full py-3 cursor-pointer bg-olive-800 hover:bg-olive-900 rounded-lg transition duration-300"
        onClick={() => showModal(true)}
      >
        <p className="font-medium text-2xl text-white text-opacity-90 select-none">
          Cancel Premium
        </p>
      </div>
    </div>
  );
}

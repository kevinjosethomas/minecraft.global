import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import CancelPremium from "../modals/CancelPremium";

export default function CancelPremiumButton(props) {
  const [modal, showModal] = useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <AnimatePresence>
        {modal && <CancelPremium showModal={showModal} server={props.server} />}
      </AnimatePresence>
      <div
        className="flex w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-olive-800 py-3 transition duration-300 hover:bg-olive-900"
        onClick={() => showModal(true)}
      >
        <p className="select-none text-2xl font-medium text-white text-opacity-90">
          Cancel Premium
        </p>
      </div>
    </div>
  );
}

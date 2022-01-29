import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import NewProduct from "../modals/NewProduct";

export default function NewProductCard(props) {
  const [modal, showModal] = useState(false);

  return (
    <div>
      <AnimatePresence>
        {modal && <NewProduct showModal={showModal} />}
      </AnimatePresence>
      <div
        className="group flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-olive-940 bg-olive-950 transition duration-300 hover:border-olive-930 hover:bg-olive-940"
        onClick={() => showModal(true)}
      >
        <i className="far fa-plus text-6xl text-olive-700 transition duration-300 group-hover:text-olive-600" />
      </div>
    </div>
  );
}

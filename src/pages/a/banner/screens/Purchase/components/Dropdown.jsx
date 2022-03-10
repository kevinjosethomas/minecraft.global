import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";

export default function DropdownContent(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div
      className="relative flex w-80 cursor-pointer select-none items-center justify-between rounded bg-olive-920 px-4 py-2"
      onClick={() => props.products.length > 1 && showDropdown((dd) => !dd)}
    >
      <p className="text-xl text-white text-opacity-80">{props.product.name}</p>
      <AnimatePresence>
        {dropdown && (
          <Dropdown
            setProduct={props.setProduct}
            products={props.products}
            showDropdown={showDropdown}
          />
        )}
      </AnimatePresence>
      {props.products.length > 1 && (
        <i className="far fa-angle-down text-xl text-white text-opacity-80" />
      )}
    </div>
  );
}

function Dropdown(props) {
  return (
    <OutsideClickHandler onOutsideClick={(e) => props.showDropdown(false)}>
      <motion.div
        className="absolute left-0 top-12 w-80 overflow-hidden rounded border-2 border-olive-930 bg-olive-940 py-1"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.products.map((p, i) => (
          <div
            key={i}
            className="flex py-1 px-4 transition duration-300 hover:bg-black hover:bg-opacity-[0.15]"
            onClick={() => props.setProduct(p)}
          >
            <p className="text-xl text-white text-opacity-80">{p.name}</p>
          </div>
        ))}
      </motion.div>
    </OutsideClickHandler>
  );
}

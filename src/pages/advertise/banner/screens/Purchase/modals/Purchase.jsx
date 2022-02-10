import { useState } from "react";
import { motion } from "framer-motion";
import OnOutsideClick from "react-outclick";

import Modal from "ui/layouts/Modal";

export default function Purchase(props) {
  const [product, setProduct] = useState(props.products[0]);

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col space-y-6 rounded-lg border-2 border-olive-940 bg-olive-950 p-6"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col space-y-1">
          <h1 className="text-4xl font-medium text-white">
            Purchase Advertisement
          </h1>
          <p className="max-w-xl text-xl text-white text-opacity-80">
            You are purchasing an advertisement on the{" "}
            <Highlight>{props.type} Page</Highlight> from{" "}
            <Highlight>{props.start.format("MMM Do")}</Highlight> to{" "}
            <Highlight>{props.end.format("MMM Do")}</Highlight> for{" "}
            <Highlight>${props.prices[`${props.type}_page`]}</Highlight>.
          </p>
        </div>
        <div className="flex flex-col items-start space-y-1">
          <p className="text-3xl font-medium text-white">Select Product</p>
          <Dropdown
            product={product}
            setProduct={setProduct}
            products={props.products}
          />
        </div>
      </motion.div>
    </Modal>
  );
}

function Highlight(props) {
  return (
    <span className="font-medium capitalize text-white text-opacity-90">
      {props.children}
    </span>
  );
}

function Dropdown(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div
      className="relative flex w-80 cursor-pointer select-none items-center justify-between rounded bg-olive-920 px-4 py-2"
      onClick={() => props.products.length > 1 && showDropdown((dd) => !dd)}
    >
      <p className="text-xl text-white text-opacity-80">{props.product.name}</p>
      {dropdown && (
        <OnOutsideClick onOutsideClick={() => showDropdown(false)}>
          <div className="absolute left-0 top-12 w-80 overflow-hidden rounded border-2 border-olive-930 bg-olive-940">
            {props.products.map((p, i) => (
              <div
                key={i}
                className="flex py-1 px-4 transition duration-300 hover:bg-black hover:bg-opacity-20"
                onClick={() => props.setProduct(p)}
              >
                <p className="text-xl text-white text-opacity-80">{p.name}</p>
              </div>
            ))}
          </div>
        </OnOutsideClick>
      )}
      {props.products.length > 1 && (
        <i className="far fa-angle-down text-xl text-white text-opacity-80" />
      )}
    </div>
  );
}

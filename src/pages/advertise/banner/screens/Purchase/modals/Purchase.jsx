import cookie from "js-cookie";
import { useState } from "react";
import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";
import Dropdown from "../components/Dropdown";
import { CreateAdvertisementSession } from "api/advertisements";

export default function Purchase(props) {
  const [product, setProduct] = useState(props.products[0]);

  const submit = async () => {
    const token = cookie.get("token");
    const [response, error] = await CreateAdvertisementSession(
      product.product_id,
      props.week_id,
      props.type,
      token
    );

    console.log(response);
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col space-y-8 rounded-lg border-2 border-olive-940 bg-olive-950 p-6"
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
        <div className="flex w-full items-center">
          <div className="flex w-full items-center justify-end space-x-2">
            <div
              className="flex cursor-pointer items-center justify-center rounded-lg bg-olive-920 px-6 py-2 transition duration-300 hover:bg-olive-910"
              onClick={() => props.showModal(false)}
            >
              <p className="select-none text-xl text-white text-opacity-90">
                Cancel
              </p>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center rounded-lg bg-olive-800 px-6 py-2 transition duration-300 hover:bg-olive-600"
              onClick={submit}
            >
              <p className="select-none text-xl text-white text-opacity-90">
                Purchase
              </p>
            </div>
          </div>
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

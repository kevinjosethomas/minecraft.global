import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Modal from "ui/layouts/Modal";
import Dropdown from "../components/Dropdown";
import { CreateAdvertisementSession } from "api/advertisements";

export default function Purchase(props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(props.products[0]);

  const submit = async () => {
    setLoading(true);

    const token = cookie.get("token");
    const [response, error] = await CreateAdvertisementSession(
      product.product_id,
      props.week_id,
      props.type,
      token
    );

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("You do not own this product!");
          break;
        case 403:
          if (
            error.response?.data.payload.detail.error ==
            "slot_already_purchased"
          ) {
            toast.error("This advertisement slot is already purchased!");
          } else {
            toast.error("You cannot purchase this advertisement slot anymore!");
          }
          break;
        case 404:
          toast.error("The product you selected is not available!");
          break;
        default:
          toast.error("An unknown error occured, please try again later!");
      }
      return;
    }

    setLoading(false);
    router.push(response.payload);
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex w-11/12 flex-col space-y-8 rounded-lg border-2 border-olive-940 bg-olive-950 p-6 md:w-auto"
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
              {loading ? (
                <img
                  draggable="false"
                  src="/images/loading.svg"
                  className="h-7 w-7"
                  alt="Loading"
                />
              ) : (
                <p className="select-none text-xl text-white text-opacity-90">
                  Purchase
                </p>
              )}
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

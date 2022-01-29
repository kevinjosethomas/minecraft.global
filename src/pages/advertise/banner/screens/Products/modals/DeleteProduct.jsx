import cookies from "js-cookie";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import Modal from "ui/layouts/Modal";
import { DeleteProduct } from "api/advertisements";

export default function DeleteProductModal(props) {
  const router = useRouter();

  const submit = async () => {
    const token = cookies.get("token");
    const [response, error] = await DeleteProduct(props.product_id, token);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("You are not authorized to do this!");
          break;
        default:
          toast.error("An unknown error occurred!");
          break;
      }
      return;
    }

    props.showModal(false);
    router.push("/advertise/banner?screen=products");
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="w-[600px] flex-col space-y-2 rounded-lg border-2 border-olive-940 bg-olive-950 p-6"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-medium text-white text-opacity-90">
          Delete Advertisement
        </h1>
        <p className="text-xl text-white text-opacity-80">
          Are you sure you want to permanently delete the &quot;{props.name}
          &quot; Advertisement Product?
        </p>
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
            className="flex cursor-pointer items-center justify-center rounded-lg bg-red-800 px-6 py-2 transition duration-300 hover:bg-red-700"
            onClick={submit}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Delete
            </p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

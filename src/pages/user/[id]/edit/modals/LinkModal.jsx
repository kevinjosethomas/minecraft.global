import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";

export default function LinkModal(props) {
  const onClick = (e) => {
    navigator.clipboard.writeText(`/link ${props.code}`);
    toast.success("Successfully copied IP!");
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex w-[800px] flex-col items-start justify-start space-y-8 rounded-md border-2 border-olive-930 bg-olive-950 p-8"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="text-3xl leading-tight text-white text-opacity-90">
          Link your Minecraft Java Account:
        </p>
        <ul className="space-y-6">
          <li className="text-xl leading-tight text-white text-opacity-90">
            • Launch Minecraft Java Edition (not cracked)
          </li>
          <li className="text-xl leading-tight text-white text-opacity-90">
            • Join our verification server at{" "}
            <code>verify.minecraft.global</code> (1.8 - 1.18)
          </li>
          <li className="flex flex-row items-center text-xl leading-tight text-white text-opacity-90">
            • Copy and paste the command - <code>/link {props.code}</code>{" "}
            <div
              className="ml-2 flex cursor-pointer flex-row items-center justify-center rounded bg-olive-800 p-2 transition duration-300 hover:bg-olive-910"
              onClick={onClick}
            >
              <i className="far fa-copy text-xl" />
            </div>
          </li>
          <li className="text-xl leading-tight text-white text-opacity-90">
            • Reload the page once you&apos;re done!
          </li>
        </ul>
      </motion.div>
    </Modal>
  );
}

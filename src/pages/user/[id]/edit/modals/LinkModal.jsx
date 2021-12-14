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
        className="flex flex-col items-start justify-start w-[800px] p-8 space-y-8 bg-olive-950 border-2 border-olive-930 rounded-md"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="text-3xl text-white text-opacity-90 leading-tight">
          Connect your Minecraft Java Account:
        </p>
        <ul className="space-y-6">
          <li className="text-xl text-white text-opacity-90 leading-tight">
            • Launch Minecraft Java Edition (not cracked)
          </li>
          <li className="text-xl text-white text-opacity-90 leading-tight">
            • Join our verification server at <code>verify.minecraft.global</code> (1.8 - 1.18)
          </li>
          <li className="flex flex-row items-center text-xl text-white text-opacity-90 leading-tight">
            • Copy and paste the command - <code>/link {props.code}</code>{" "}
            <div
              className="flex flex-row items-center justify-center p-2 ml-2 bg-olive-800 rounded hover:bg-olive-910 transition duration-300 cursor-pointer"
              onClick={onClick}
            >
              <i className="far fa-copy text-xl" />
            </div>
          </li>
          <li className="text-xl text-white text-opacity-90 leading-tight">
            • Reload the page once you&apos;re done!
          </li>
        </ul>
      </motion.div>
    </Modal>
  );
}

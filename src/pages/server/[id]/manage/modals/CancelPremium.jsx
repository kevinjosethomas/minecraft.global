import moment from "moment";
import Link from "next/link";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";
import { CancelPremiumSubscription } from "api/premium";

export default function CancelPremium(props) {
  const submit = async () => {
    const token = cookies.get("token");
    const [response, error] = await CancelPremiumSubscription(props.server.server_id, token);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("An authorization error occured, please relogin and try again!");
          break;
        case 404:
          toast.error("We couldn't find your Stripe subscription. Please contact support!");
          break;
        default:
          toast.error("An unknown error occurred! Please try again later!");
          break;
      }
      return;
    }

    toast.success("Successfully cancelled premium subscription!");
    props.showModal(false);
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col items-start justify-between w-[700px] h-[400px] p-10 bg-olive-940 border-2 border-olive-920 rounded-md"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col items-start justify-start space-y-3">
          <h1 className="font-medium text-3xl text-white text-opacity-90">
            Cancel {props.server.name}&apos;s Premium
          </h1>
          <div className="flex flex-col items-start justify-start space-y-3">
            <p className="text-xl text-white text-opacity-70">
              This process is irreversible. However, you can resubscribe to Premium at anytime in
              the future! Thanks a lot for your support :D
            </p>
            <p className="text-xl text-white text-opacity-70">
              Your Premium subscription will end on{" "}
              {moment(props.server.premium_expires).local().format("MMMM Do YYYY")}. You will not be
              charged after this date.
            </p>
            <p className="text-xl text-white text-opacity-70 format-links">
              <Link href="/support">Contact us</Link> if you have any questions or run into any
              issues!
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start w-full space-x-4">
          <div
            className="flex flex-row items-center justify-center w-full py-2 bg-white bg-opacity-5 rounded-md cursor-pointer hover:bg-opacity-10 transition duration-300"
            onClick={() => props.showModal(false)}
          >
            <p className="text-xl text-white text-opacity-80 select-none">Nevermind, go back</p>
          </div>
          <div
            className="flex flex-row items-center justify-center w-full py-2 bg-red-900 rounded-md cursor-pointer hover:bg-red-800 transition duration-300"
            onClick={submit}
          >
            <p className="text-xl text-white text-opacity-80 select-none">Cancel Premium</p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

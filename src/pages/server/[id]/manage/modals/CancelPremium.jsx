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
    const [response, error] = await CancelPremiumSubscription(
      props.server.server_id,
      token
    );

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error(
            "An authorization error occured, please relogin and try again!"
          );
          break;
        case 404:
          toast.error(
            "We couldn't find your Stripe subscription. Please contact support!"
          );
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
        className="flex h-[400px] w-[700px] flex-col items-start justify-between rounded-md border-2 border-olive-920 bg-olive-940 p-10"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col items-start justify-start space-y-3">
          <h1 className="text-3xl font-medium text-white text-opacity-90">
            Cancel {props.server.name}&apos;s Premium
          </h1>
          <div className="flex flex-col items-start justify-start space-y-3">
            <p className="text-xl text-white text-opacity-70">
              This process is irreversible. However, you can resubscribe to
              Premium at anytime in the future! Thanks a lot for your support :D
            </p>
            <p className="text-xl text-white text-opacity-70">
              Your Premium subscription will end on{" "}
              {moment(props.server.premium_expires)
                .local()
                .format("MMMM Do YYYY")}
              . You will not be charged after this date.
            </p>
            <p className="format-links text-xl text-white text-opacity-70">
              <Link href="/support">Contact us</Link> if you have any questions
              or run into any issues!
            </p>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-start space-x-4">
          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center rounded-md bg-white bg-opacity-5 py-2 transition duration-300 hover:bg-opacity-10"
            onClick={() => props.showModal(false)}
          >
            <p className="select-none text-xl text-white text-opacity-80">
              Nevermind, go back
            </p>
          </div>
          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center rounded-md bg-red-900 py-2 transition duration-300 hover:bg-red-800"
            onClick={submit}
          >
            <p className="select-none text-xl text-white text-opacity-80">
              Cancel Premium
            </p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

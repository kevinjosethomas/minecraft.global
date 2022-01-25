import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import { DeleteServer } from "api/server";
import DeleteModal from "../components/Delete";

export default function Delete(props) {
  const router = useRouter();
  const [modal, showModal] = useState(false);

  const submit = async () => {
    const token = cookie.get("token");
    const [response, error] = await DeleteServer(props.server.server_id, token);

    if (error) {
      if (error?.response?.status === 401) {
        toast.error(
          "An authorization error occured, please relogin and try again!"
        );
      }
      return;
    }

    router.push(`/user/${props.user.user_id}`);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-6">
      <AnimatePresence>
        {modal && <DeleteModal submit={submit} showModal={showModal} />}
      </AnimatePresence>
      <div className="!mt-0 flex flex-col items-start justify-start space-y-2">
        <p className="text-3xl font-medium text-white text-opacity-90">
          Are you sure you want to delete your server?
        </p>
        <p className="max-w-x text-lg text-white text-opacity-80">
          This process is irreversible. All your server data, upvotes and tokens
          will be permanently deleted!
        </p>
      </div>
      <div
        className="flex cursor-pointer flex-row items-center justify-center rounded bg-red-900 px-6 py-2 transition duration-300 hover:bg-red-800"
        onClick={() => showModal(true)}
      >
        <p className="select-none text-2xl font-medium text-white text-opacity-90">
          Delete Server
        </p>
      </div>
    </div>
  );
}

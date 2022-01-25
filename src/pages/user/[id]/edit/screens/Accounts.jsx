import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { FetchLinkCode } from "api/user";
import LinkModal from "../modals/LinkModal";

export default function Accounts(props) {
  const [linkCode, setLinkCode] = useState("...");
  const [linkModal, showLinkModal] = useState(false);

  useEffect(() => {
    if (linkModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [linkModal]);

  useEffect(() => {
    (async () => {
      if (linkCode !== "...") return;

      const token = cookies.get("token");
      const [response, error] = await FetchLinkCode(token);

      if (error) {
        if (error.response?.status === 404) {
          toast.error(
            "Invalid login info, please relogin and try again later!"
          );
        } else {
          toast.error("An unknown error occurred!");
        }
        return;
      }

      setLinkCode(response.payload);
    })();
  }, [linkModal]);

  return (
    <div className="flex w-full flex-col items-start justify-start rounded border-2 border-olive-940 bg-olive-950 p-10">
      <AnimatePresence>
        {linkModal && <LinkModal showModal={showLinkModal} code={linkCode} />}
      </AnimatePresence>
      <div className="flex flex-col items-start justify-start space-y-6">
        <h1 className="text-5xl font-medium text-white text-opacity-90">
          Accounts
        </h1>
        <div className="flex flex-col items-start justify-start space-y-2">
          {props.google_id && (
            <div className="flex w-[500px] cursor-default flex-row items-center justify-start space-x-2 rounded-lg bg-[#DCA504] px-4 py-1.5 transition duration-300 hover:bg-opacity-80">
              <i className="fab fa-google w-[30px] text-2xl text-white" />
              <p className="select-none text-2xl text-white">
                {props.google_name}
              </p>
            </div>
          )}
          {props.discord_id && (
            <div className="flex w-[500px] cursor-default flex-row items-center justify-start space-x-2 rounded-lg bg-[#5865F2] px-4 py-1.5 transition duration-300 hover:bg-opacity-70">
              <i className="fab fa-discord w-[30px] text-2xl text-white" />
              <p className="select-none text-2xl text-white">
                {props.discord_username}
              </p>
            </div>
          )}
          {props.minecraft_uuid ? (
            <div className="flex w-[500px] cursor-default flex-row items-center justify-start space-x-2 rounded-lg bg-olive-800 px-4 py-1.5 transition duration-300 hover:bg-opacity-80">
              <i className="far fa-cube w-[30px] text-2xl text-white" />
              <p className="select-none text-2xl text-white">
                {props.minecraft_username}
              </p>
            </div>
          ) : (
            <div
              className="flex w-[500px] cursor-pointer flex-row items-center justify-start space-x-2 rounded-lg bg-olive-800 px-4 py-1.5 transition duration-300 hover:bg-opacity-80"
              onClick={() => showLinkModal(true)}
            >
              <i className="far fa-cube w-[30px] text-2xl text-white" />
              <p className="select-none text-2xl text-white">
                Link your Minecraft Java Account
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import LinkModal from "../modals/LinkModal";
import { GenerateLinkCode } from "api/minecraft";

export default function Connections(props) {
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
      const [response, error] = await GenerateLinkCode(token);

      if (error) {
        if (error.response?.status === 404) {
          toast.error("Invalid login info, please relogin and try again later!");
        } else {
          toast.error("An unknown error occurred!");
        }
        return;
      }

      setLinkCode(response.payload);
    })();
  }, [linkModal]);

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 bg-olive-950 rounded border-2 border-olive-940">
      <AnimatePresence>
        {linkModal && <LinkModal showModal={showLinkModal} code={linkCode} />}
      </AnimatePresence>
      <div className="flex flex-col items-start justify-start space-y-2">
        <h1 className="font-medium text-5xl text-white text-opacity-90">Connections</h1>
        <div className="flex flex-col items-start justify-start space-y-2">
          {props.google_id && (
            <div className="flex flex-row items-center justify-start w-[500px] px-4 py-1.5 space-x-2 bg-[#DCA504] hover:bg-opacity-80 rounded-lg transition duration-300 cursor-default">
              <i className="fab fa-google w-[30px] text-2xl text-white" />
              <span className="text-2xl text-white">{props.google_name}</span>
            </div>
          )}
          {props.discord_id && (
            <div className="flex flex-row items-center justify-start w-[500px] px-4 py-1.5 space-x-2 bg-[#5865F2] hover:bg-opacity-70 rounded-lg transition duration-300 cursor-default">
              <i className="fab fa-discord w-[30px] text-2xl text-white" />
              <span className="text-2xl text-white">{props.discord_username}</span>
            </div>
          )}
          {props.minecraft_uuid ? (
            <div className="flex flex-row items-center justify-start w-[40500px0px] px-4 py-1.5 space-x-2 bg-olive-800 hover:bg-opacity-80 rounded-lg transition duration-300 cursor-default">
              <i className="far fa-cube w-[30px] text-2xl text-white" />
              <span className="text-2xl text-white">{props.minecraft_username}</span>
            </div>
          ) : (
            <div
              className="flex flex-row items-center justify-start w-[500px] px-4 py-1.5 space-x-2 bg-olive-800 hover:bg-opacity-80 rounded-lg transition duration-300 cursor-default"
              onClick={() => showLinkModal(true)}
            >
              <i className="far fa-cube w-[30px] text-2xl text-white" />
              <span className="text-2xl text-white">Connect your Minecraft Java Account</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

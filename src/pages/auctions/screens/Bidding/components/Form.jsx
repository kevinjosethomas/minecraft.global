import { useState } from "react";
import OnOutsideClick from "react-outclick";
import { motion, AnimatePresence } from "framer-motion";

import Metadata from "./Metadata";

export default function BiddingPanel(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2 rounded-lg border-2 border-olive-930 bg-olive-950 p-5">
      <Metadata {...props} />
      <div className="!my-4 h-0.5 w-full bg-white bg-opacity-20" />
      <Bid user={props.user} />
    </div>
  );
}

function Bid(props) {
  const [bid, setBid] = useState("");
  const [dropdown, showDropdown] = useState(false);
  const [server, setServer] = useState(props.user.servers[0]);

  const onBidChange = (e) => {
    const value = Number(e.target.value.replace(/\D/g, ""));

    if (value > 10000) {
      return;
    }

    setBid(value.toLocaleString());
  };

  return (
    <div className="!mt-0 flex w-full flex-col items-start justify-start space-y-4">
      <div className="flex w-full flex-col items-start justify-start space-y-1">
        <p className="text-lg text-white text-opacity-80">Select a server</p>
        <div
          className="relative flex h-12 w-full cursor-pointer items-center justify-between rounded bg-olive-900 px-4"
          onClick={() => showDropdown((d) => !d)}
        >
          <p className="select-none text-lg text-white text-opacity-80">
            {server.name}
          </p>
          <AnimatePresence>
            {dropdown && (
              <Dropdown
                server={server}
                setServer={setServer}
                showDropdown={showDropdown}
                servers={props.user.servers}
              />
            )}
          </AnimatePresence>
          <i className="far fa-angle-down text-lg text-white text-opacity-80" />
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <p className="text-lg text-white text-opacity-80">Enter bid amount</p>
        <div className="flex w-full items-center justify-start space-x-2">
          <div className="flex h-12 w-full items-center justify-start overflow-hidden rounded border-2 border-olive-930 bg-olive-950">
            <div className="flex h-12 min-w-[3rem] items-center justify-center border-r-2 border-olive-930 bg-olive-900">
              <i className="far fa-dollar-sign text-lg text-white text-opacity-80" />
            </div>
            <input
              value={bid}
              className="focus:outline-none h-full w-full bg-transparent px-2 text-lg text-white text-opacity-60"
              onChange={onBidChange}
            />
          </div>
          <div
            className={`flex h-12 min-w-[3rem] items-center justify-center rounded ${
              Number(bid.replace(/\D/g, ""))
                ? "cursor-pointer bg-olive-700 transition duration-300 hover:bg-olive-800"
                : "bg-olive-900"
            }`}
          >
            <i className="far fa-angle-right text-2xl text-white text-opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-14 left-0 flex w-full flex-col items-start justify-start rounded border-2 border-olive-920 bg-olive-930"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.servers.map((server, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-start px-3 py-1 transition duration-300 hover:bg-black hover:bg-opacity-20"
            onClick={() => props.setServer(server)}
          >
            <p className="text-lg text-white text-opacity-80">{server.name}</p>
          </div>
        ))}
      </motion.div>
    </OnOutsideClick>
  );
}

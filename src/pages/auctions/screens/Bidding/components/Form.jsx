import { useState } from "react";
import OnOutsideClick from "react-outclick";
import { motion, AnimatePresence } from "framer-motion";

import Metadata from "./Metadata";

export default function BiddingPanel(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full p-5 space-y-2 bg-olive-950 border-2 border-olive-930 rounded-lg">
      <Metadata {...props} />
      <div className="w-full h-0.5 bg-white bg-opacity-20 !my-4" />
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
    <div className="flex flex-col items-start justify-start w-full !mt-0 space-y-3">
      <div className="flex flex-col items-start justify-start w-full space-y-1 cursor-pointer">
        <p className="text-lg text-white text-opacity-80">Select a server</p>
        <div
          className="relative flex flex-row items-center justify-between w-full h-12 px-4 bg-olive-910 rounded cursor-pointer"
          onClick={() => showDropdown((d) => !d)}
        >
          <p className="text-lg text-white text-opacity-80 select-none">{server.name}</p>
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
      <div className="flex flex-col items-start justify-start w-full space-y-1">
        <p className="text-lg text-white text-opacity-80">Enter bid amount</p>
        <div className="flex flex-row items-center justify-start w-full h-12 bg-black bg-opacity-10 rounded border-2 border-olive-940 overflow-hidden">
          <div className="flex flex-row items-center justify-center min-w-[3rem] h-12 bg-white bg-opacity-5 border-r-2 border-olive-940">
            <i className="far fa-dollar-sign text-lg text-white text-opacity-80" />
          </div>
          <input
            value={bid}
            className="h-full w-full px-2 bg-transparent text-lg text-white text-opacity-60 focus:outline-none"
            onChange={onBidChange}
          />
        </div>
      </div>
    </div>
  );
}

function Dropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute flex flex-col items-start justify-start top-14 left-0 w-full bg-olive-930 rounded"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.servers.map((server, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-start w-full px-4 py-1 hover:bg-black hover:bg-opacity-20 transition duration-300"
            onClick={() => props.setServer(server)}
          >
            <p className="text-lg text-white text-opacity-80">{server.name}</p>
          </div>
        ))}
      </motion.div>
    </OnOutsideClick>
  );
}

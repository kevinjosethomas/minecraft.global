import moment from "moment";
import Countdown from "react-countdown";
import OnOutsideClick from "react-outclick";
import { Fragment, useState } from "react";
import SimplifyNumber from "simplify-number";
import { motion, AnimatePresence } from "framer-motion";

export default function BiddingPanel(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full p-5 space-y-2 bg-olive-950 border-2 border-olive-930 rounded-lg">
      <Metadata {...props} />
      <div className="w-full h-0.5 bg-white bg-opacity-20 !my-4" />
      <Bid user={props.user} />
    </div>
  );
}

function Metadata(props) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return "Bidding has ended :)";
    } else {
      if (!days) {
        if (!hours) {
          if (!minutes) {
            return `${seconds} seconds`;
          }
          return `${minutes}m ${seconds}s`;
        }
        return `${hours}h ${minutes}m ${seconds}s`;
      }
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  };

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-start space-x-2">
        <div className="w-3 h-3 auctions-red-dot rounded-full" />
        <p className="text-lg text-white text-opacity-80">
          Ends on {moment(props.endsAt).format("ddd, Do MMM")} at{" "}
          {moment(props.endsAt).format("HH:MMa")}
        </p>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <a
          target="_blank"
          rel="noreferrer"
          href={props.page?.link || null}
          className="flex flex-row items-center justify-start w-full py-2 px-3 mb-2 space-x-2 bg-white bg-opacity-5 rounded"
        >
          <i className="fas fa-tag text-lg text-white text-opacity-80" />
          <p className="text-lg text-white text-opacity-80 select-none">
            {props.page?.name || "Loading..."}
          </p>
        </a>
        <div className="flex flex-row items-center justify-start space-x-2 mb-1">
          <i className="far fa-trophy w-[20.5px] text-center text-lg text-white text-opacity-80" />
          <p className="text-lg text-white text-opacity-80">2 winners</p>
        </div>
        <div className="flex flex-row items-center justify-start space-x-2 mb-1">
          <i className="far fa-badge-dollar w-[20.5px] text-center text-lg text-white text-opacity-80" />
          <p className="text-lg text-white text-opacity-80">
            Minimum bid: ${props.bids ? props.bids[0]?.usd_amount || props.startingBid : "..."}
          </p>
        </div>
        <div className="flex flex-row items-center justify-start space-x-2 mb-1">
          <i className="far fa-eye w-[20.5px] text-center text-lg text-white text-opacity-80" />
          <p className="text-lg text-white text-opacity-80">
            {props.page?.views ? SimplifyNumber(props.page.views, { decimal: 1 }) : "..."} views
            every week
          </p>
        </div>
        <div className="flex flex-row items-center justify-start space-x-2">
          <i className="far fa-clock w-[20.5px] text-center text-lg text-white text-opacity-80" />
          <p className="text-lg text-white text-opacity-80">
            {props.endsAt ? (
              <p className="text-lg text-white text-opacity-80">
                <Countdown date={props.endsAt} renderer={renderer} /> remaining
              </p>
            ) : (
              <p className="text-lg text-white text-opacity-80">... remaining</p>
            )}
          </p>
        </div>
      </div>
    </Fragment>
  );
}

function Bid(props) {
  const [bid, setBid] = useState();
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

import moment from "moment";
import Countdown from "react-countdown";
import SimplifyNumber from "simplify-number";

export default function BiddingPanel(props) {
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
    <div className="flex flex-col items-start justify-start w-full p-5 space-y-2 bg-olive-950 border-2 border-olive-930 rounded-lg">
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
          href={props.page.link || null}
          className="flex flex-row items-center justify-start w-full py-2 px-3 mb-2 space-x-2 bg-white bg-opacity-5 rounded"
        >
          <i className="fas fa-tag text-lg text-white text-opacity-80" />
          <p className="text-lg text-white text-opacity-80 select-none">
            {props.page?.name || "Loading..."}
          </p>
        </a>
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
    </div>
  );
}

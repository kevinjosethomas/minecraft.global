import moment from "moment";
import { Fragment } from "react";
import Countdown from "react-countdown";
import SimplifyNumber from "simplify-number";

export default function Metadata(props) {
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
      <div className="flex items-center justify-start space-x-2">
        <div className="auctions-red-dot h-3 w-3 rounded-full" />
        <p className="text-lg text-white text-opacity-80">
          Ends on {moment(props.endsAt).format("ddd, Do MMM")} at{" "}
          {moment(props.endsAt).format("HH:MMa")}
        </p>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <a
          target="_blank"
          rel="noreferrer"
          href={props.page?.link || null}
          className="mb-2 flex w-full items-center justify-between rounded bg-white bg-opacity-5 py-2 px-3"
        >
          <div className="flex items-center justify-start space-x-2">
            <i className="fas fa-tag text-lg text-white text-opacity-80" />
            <p className="select-none text-lg text-white text-opacity-80">
              {props.page?.name || "Loading..."}
            </p>
          </div>
          {props.page?.link && (
            <i className="far fa-external-link-alt text-lg text-white text-opacity-80" />
          )}
        </a>
        <Value icon="far fa-trophy" value="2 winners" />
        <Value
          icon="far fa-badge-dollar"
          value={`Minimum bid: $${
            props.bids ? props.bids[0]?.usd_amount || props.startingBid : "..."
          }`}
        />
        <Value
          icon="far fa-eye"
          value={`${
            props.page?.views
              ? SimplifyNumber(props.page.views, { decimal: 1 })
              : "..."
          } weekly views`}
        />
        <Value icon="far fa-clock">
          {props.endsAt ? (
            <p className="text-lg text-white text-opacity-80">
              <Countdown date={props.endsAt} renderer={renderer} /> remaining
            </p>
          ) : (
            <p className="text-lg text-white text-opacity-80">... remaining</p>
          )}
        </Value>
      </div>
    </Fragment>
  );
}

function Value(props) {
  return (
    <div className="mb-1 flex items-center justify-start space-x-2">
      <i
        className={`${props.icon} w-[20.5px] text-center text-lg text-white text-opacity-80`}
      />
      <p className="text-lg text-white text-opacity-80">
        {props.value || props.children}
      </p>
    </div>
  );
}

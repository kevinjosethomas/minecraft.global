import { AuctionBid } from "lib/types";

type BidProps = {
  index: number;
  bid: AuctionBid;
};

function Bid(props: BidProps): JSX.Element {
  return (
    <div key={props.index} className="flex flex-row items-center justify-center px-4 py-2">
      <span
        className={`w-14 text-2xl ${
          props.index <= 2 ? "text-gray-400 font-medium" : "text-gray-500"
        }`}
      >
        {props.index + 1}
      </span>
      <span
        className={`w-96 text-2xl ${
          props.index <= 2 ? "text-gray-400 font-medium" : "text-gray-500"
        }`}
      >
        {props.bid.name}
      </span>
      <span
        className={`w-60 text-2xl ${
          props.index <= 2 ? "text-gray-400 font-medium" : "text-gray-500"
        }`}
      >
        ${props.bid.usd_amount}
      </span>
    </div>
  );
}

export default Bid;

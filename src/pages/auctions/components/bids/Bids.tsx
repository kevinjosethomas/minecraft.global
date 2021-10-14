import Bid from "./components/Bid";
import { AuctionBid } from "lib/types";
import Header from "./components/Header";

type BidsProps = {
  bids: AuctionBid[];
};

function Bids(props: BidsProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-[26rem] rounded border-2 border-gray-900">
      <Header />
      <div className="flex flex-col items-start justify-start w-full h-full overflow-y-scroll                          bg-dark-800">
        {props.bids.length ? (
          <>
            {props.bids.map((bid: AuctionBid, index: number) => (
              <Bid key={index} index={index} bid={bid} />
            ))}
          </>
        ) : (
          <div className="flex flex-row items-center justify-start p-4 w-full">
            <span className="font-bold text-2xl text-gray-400">No bids yet</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bids;

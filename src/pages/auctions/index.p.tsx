import Countdown from "react-countdown";
import { useEffect, useState } from "react";

import { Auction } from "lib/types";

type AuctionsProps = {};

enum AuctionsPacketType {
  INFO = 0, // Load all data for all locations
  NEW_BID = 1, // Sent from client to server
  BIDDER_COUNT = 2, // Sent from server to client
}

function Auctions(props: AuctionsProps): JSX.Element {
  const [bids, setBids] = useState([]);
  const [endTime, setEndTime] = useState(0);
  const [bidderCount, setBidderCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("wss://api.minecraft.global/auctionsws");

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);

      if (data.type === AuctionsPacketType.INFO) {
        setBids(data.payload.bids.sort((a: Auction, b: Auction) => a.usd_amount - b.usd_amount));
        setEndTime(Date.parse(data.payload.ends_at));
      } else if (data.type === AuctionsPacketType.BIDDER_COUNT) {
        setBidderCount(data.payload);
      }

      console.log(data);
    };
  }, []);

  return <div className="">{endTime && <Countdown date={endTime} />}</div>;
}

export default Auctions;

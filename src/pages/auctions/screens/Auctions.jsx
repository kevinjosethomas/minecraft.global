import { useEffect, useState } from "react";

import BiddingPanel from "../components/BiddingPanel";
import AuctionsPanel from "../components/AuctionsPanel";

const OPCODES = {
  INITIALIZE: 0, // b > c | list of tags/rooms
  JOIN: 1, // c > b | specifies which tag the user is viewing
  ROOM_DATA: 2, // b > c | sends all bids & data to the user
  CREATE_BID: 3, // c > b | creates a bid
  ERROR: 4, // b > c | error
};

export default function Auctions(props) {
  const [websocket, setWebsocket] = useState();

  const [page, setPage] = useState();
  const [bids, setBids] = useState();
  const [pages, setPages] = useState();
  const [endsAt, setEndsAt] = useState();
  const [startingBid, setStartingBid] = useState();

  useEffect(() => {
    const ws = new WebSocket("wss://api.minecraft.global/auctions/live");
    setWebsocket(ws);

    ws.onmessage = (msg) => {
      const { op, payload } = JSON.parse(msg.data);

      console.log(payload);

      if (op === OPCODES.INITIALIZE) {
        setEndsAt(payload.ends_at);
        setPages(payload.rooms);
        setPage(payload.rooms[0]);
      } else if (op == OPCODES.ROOM_DATA) {
        setBids(payload.bids);
        setStartingBid(payload.starting_bid);
      } else if (op == OPCODES.ERROR) {
      }
    };
  }, []);

  useEffect(() => {
    if (!websocket || !page) return;

    websocket.send(
      JSON.stringify({
        op: OPCODES.JOIN,
        payload: {
          location: page.name,
        },
      })
    );
  }, [page]);

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-row items-start justify-start w-full space-x-6">
        <AuctionsPanel pages={pages} page={page} setPage={setPage} />
        <BiddingPanel page={page} bids={bids} endsAt={endsAt} startingBid={startingBid} />
      </div>
    </div>
  );
}

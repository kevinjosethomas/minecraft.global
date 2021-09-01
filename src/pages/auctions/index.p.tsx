import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Confirm from "./modals/Confirm";
import Default from "ui/layouts/Default";
import Bids from "./components/bids/Bids";
import System from "./components/system/System";
import Description from "./components/description/Description";
import { Server, Dropdown, Auction, AuctionBid, AuctionsPacketType } from "lib/types";

type AuctionsProps = {
  user: Record<string, any>;
};

function Auctions(props: AuctionsProps): JSX.Element {
  const [websocket, setWebsocket] = useState<any>();

  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [auctionsEndTime, setAuctionsEndTime] = useState(0);
  const [numberOfBidders, setNumberOfBidders] = useState(0);

  const [enteredBid, setEnteredBid] = useState("");
  const [confirmModal, showConfirmModal] = useState(false);

  const dropdownOptions: Dropdown[] = [];
  props.user.servers.forEach((server: Server) => {
    dropdownOptions.push({ label: server.name, value: server.server_id });
  });

  const [selectedServer, setSelectedServer] = useState(dropdownOptions[0]);

  useEffect(() => {
    const ws = new WebSocket("wss://api.minecraft.global/auctions/ws");
    setWebsocket(ws);

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case AuctionsPacketType.INFO:
          setBids(data.payload.bids.sort((a: Auction, b: Auction) => a.usd_amount + b.usd_amount));
          setAuctionsEndTime(Date.parse(data.payload.ends_at));
          break;
        case AuctionsPacketType.BIDDER_COUNT:
          setNumberOfBidders(data.payload);
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Default background="bg-dark-700" user={props.user}>
      {confirmModal && (
        <Confirm
          user={props.user}
          websocket={websocket}
          enteredBid={enteredBid}
          selectedServer={selectedServer}
          showConfirmModal={showConfirmModal}
        />
      )}
      <div className="flex flex-col items-start justify-center w-full space-y-10">
        <span className="font-bold text-6xl text-gray-300">Auctions</span>
        <div className="flex flex-row items-start space-x-10 w-full">
          <Description />
          <Bids bids={bids} />
          <System
            bids={bids}
            enteredBid={enteredBid}
            setEnteredBid={setEnteredBid}
            numberOfBidders={numberOfBidders}
            auctionsEndTime={auctionsEndTime}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
            dropdownOptions={dropdownOptions}
            showConfirmModal={showConfirmModal}
          />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      redirect: {
        destination: process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: user.payload,
      },
    };
  }
}

export default Auctions;

import Dropdown from "react-dropdown";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import { Auction, Server } from "lib/types";

import "react-dropdown/style.css";

type AuctionsProps = {
  user?: Record<string, any>;
};

enum AuctionsPacketType {
  INFO = 0, // Load all data for all locations
  NEW_BID = 1, // Sent from client to server
  BIDDER_COUNT = 2, // Sent from server to client
}

function Auctions(props: AuctionsProps): JSX.Element {
  const [bids, setBids] = useState([]);
  const [endTime, setEndTime] = useState(0);
  const [bidderCount, setBidderCount] = useState(0);

  const servers: Record<string, any> = [];
  props.user.servers.forEach((server: Server) => {
    !server.premium && servers.push({ value: server.server_id, label: server.name });
  });

  const [selectedServer, setSelectedServer] = useState(servers[0].value);

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

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-col items-start justify-center space-y-4">
          <div className="flex flex-col items-start justify-center">
            <span className="font-medium text-xl text-gray-400">Select a server to advertise</span>
            <Dropdown
              options={servers as any[]}
              value={servers[0] as any}
              className="w-96"
              controlClassName="!bg-dark-900 !rounded !border-2 !border-gray-800"
              placeholderClassName="!text-gray-400"
              menuClassName="!bg-dark-900 !rounded !border-2 !border-gray-800"
              arrowClassName="!text-gray-500"
              onChange={(e: any) => {
                setSelectedServer(e.value);
              }}
            />
          </div>
          <div className="h-0.5 w-full bg-gray-800 rounded" />
          <span className="font-bold text-sm text-gray-500 w-96">
            These auctions are held weekly and end at 5pm GMT every Sunday. The top three bids win
            the first three auction spots on the minecraft.global homepage. Advertisements will be
            updated on the following Tuesday provided that the bids were paid for. Auctions will
            refresh on the following Wednesday.
          </span>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
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

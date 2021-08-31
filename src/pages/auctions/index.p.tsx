import toast from "react-hot-toast";
import Dropdown from "react-dropdown";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Confirm from "./modals/Confirm";
import Default from "ui/layouts/Default";
import Toast from "ui/components/Toast/Toast";
import { Auction, Server, AuctionsPacketType } from "lib/types";

import "react-dropdown/style.css";

type AuctionsProps = {
  user: Record<string, any>;
};

function Auctions(props: AuctionsProps): JSX.Element {
  const [websocket, setWebsocket] = useState<any>();
  const [bids, setBids] = useState([]);
  const [endTime, setEndTime] = useState(0);
  const [bidderCount, setBidderCount] = useState(0);
  const [bidValue, setBidValue] = useState("");
  const [confirmModal, showConfirmModal] = useState(false);

  const servers: Record<string, any>[] = [];
  props.user.servers.forEach((server: Server) => {
    !server.premium && servers.push({ value: server.server_id, label: server.name });
  });

  const [selectedServer, setSelectedServer] = useState(servers[0].value);

  const onBidChange = (e: any) => {
    setBidValue(Number(e.target.value.replace(/\D/g, "")).toLocaleString());
  };

  const onBidKeyPress = (e: any) => {
    if (e.key == "Enter") {
      const value = Number(bidValue.replace(",", ""));

      if (value < 10) {
        toast.custom((t) => (
          <Toast
            icon="fas fa-times-circle text-red-500 text-opacity-75"
            title="Minimum Bid"
            subtitle="You must bid atleast $10"
          />
        ));
      }

      console.log(servers);

      showConfirmModal(true);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("wss://api.minecraft.global/auctions/ws");
    setWebsocket(ws);

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);

      if (data.type === AuctionsPacketType.INFO) {
        setBids(data.payload.bids.sort((a: Auction, b: Auction) => a.usd_amount + b.usd_amount));
        setEndTime(Date.parse(data.payload.ends_at));
      } else if (data.type === AuctionsPacketType.BIDDER_COUNT) {
        setBidderCount(data.payload);
      }

      console.log(data);
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
          bidValue={bidValue}
          selectedServer={servers.find((server: any) => server.value == selectedServer) as any}
          showConfirmModal={showConfirmModal}
        />
      )}
      <div className="flex flex-col items-start justify-center w-full space-y-10">
        <span className="font-bold text-6xl text-gray-300">Auctions</span>
        <div className="flex flex-row items-start space-x-10 w-full">
          <div className="flex flex-col items-start justify-center space-y-4">
            <span className="font-bold text-sm text-gray-500 w-80">
              These auctions are held weekly and end at 5pm GMT every Sunday. The top three bids win
              the first three auction spots on the minecraft.global homepage. Advertisements will be
              updated on the following Tuesday provided that the bids were paid for. Next weekly
              auction will begin on the following Wednesday.
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[26rem] rounded border-2 border-gray-900">
            <div className="flex flex-row items-center justify-center p-4 bg-dark-900 rounded-t">
              <span className="w-14 font-bold text-3xl text-gray-300">#</span>
              <span className="w-96 font-bold text-3xl text-gray-300">Server</span>
              <span className="w-60 font-bold text-3xl text-gray-300">Amount</span>
            </div>
            <div className="flex flex-col items-start justify-start w-full h-full overflow-y-scroll                          bg-dark-800">
              {bids.length ? (
                <>
                  {bids.map((bid: Record<string, any>, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row items-center justify-center px-4 py-2"
                    >
                      <span
                        className={`w-14 text-2xl ${
                          index <= 2 ? "text-gray-400 font-medium" : "text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`w-96 text-2xl ${
                          index <= 2 ? "text-gray-400 font-medium" : "text-gray-500"
                        }`}
                      >
                        {bid.name}
                      </span>
                      <span
                        className={`w-60 text-2xl ${
                          index <= 2 ? "text-gray-400 font-medium" : "text-gray-500"
                        }`}
                      >
                        ${bid.usd_amount}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-row items-center justify-start p-4 w-full">
                  <span className="font-bold text-2xl text-gray-400">No bids yet</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-between w-full h-[26rem] p-8 bg-dark-800 rounded border-2 border-gray-900">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-row items-center justify-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="font-medium text-lg text-gray-400">
                  {bidderCount} bidding right now
                </span>
              </div>
              <div className="flex flex-row items-center justify-start w-full p-2 bg-dark-600 rounded">
                <span className="text-lg text-gray-400">
                  Auctions end in <Countdown date={endTime} />
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <span className="font-medium text-lg text-gray-400">
                Select a server to advertise
              </span>
              <Dropdown
                options={servers as any[]}
                value={servers[0] as any}
                className="w-full"
                controlClassName="!bg-dark-600 !rounded !border-2 !border-gray-800"
                placeholderClassName="!text-gray-400"
                menuClassName="!bg-dark-900 !rounded !border-2 !border-gray-800"
                arrowClassName="!text-gray-500"
                onChange={(e: any) => {
                  setSelectedServer(e.value);
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <span className="font-medium text-lg text-gray-400">Enter bid amount</span>
              <div className="flex flex-row items-center justify-start w-full h-10 bg-dark-600 rounded">
                <div className="flex flex-row items-center justify-center w-10 h-10 bg-olive-900 rounded-l">
                  <i className="fas fa-dollar-sign text-gray-400" />
                </div>
                <input
                  className="w-full h-full px-2 font-medium text-gray-400 bg-transparent focus:outline-none"
                  maxLength={5}
                  value={bidValue}
                  onChange={onBidChange}
                  onKeyPress={onBidKeyPress}
                />
              </div>
              <span className="text-gray-500">
                Hit <span className="font-bold">Enter</span> to bid
              </span>
            </div>
          </div>
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

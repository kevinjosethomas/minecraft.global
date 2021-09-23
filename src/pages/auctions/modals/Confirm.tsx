import cookie from "js-cookie";

import { AuctionsPacketType } from "lib/types";

type ConfirmProps = {
  user: Record<string, any>;
  websocket: WebSocket;
  enteredBid: string;
  selectedServer: Record<string, any>;
  showConfirmModal: CallableFunction;
};

function Confirm(props: ConfirmProps): JSX.Element {
  const confirm = () => {
    props.websocket.send(
      JSON.stringify({
        type: AuctionsPacketType.NEW_BID,
        payload: {
          authorization: cookie.get("token"),
          user_id: props.user.user_id,
          bid_usd: parseInt(props.enteredBid.replace(",", "")),
          server_id: props.selectedServer.value,
        },
      })
    );
  };
  return (
    <div
      className="fixed grid grid-flow-col content-center gap-x-10 justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-10 overflow-y-hidden"
      onClick={() => props.showConfirmModal(false)}
    >
      <div
        className="flex flex-col items-start justify-between p-10 space-y-5 bg-dark-800 border-2 border-gray-800 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-gray-400 text-xl max-w-sm">
          Are you sure you want to bid <span className="font-bold">${props.enteredBid}</span> for{" "}
          <span className="font-bold">{props.selectedServer.label}</span>? This action cannot be
          reversed!
        </span>
        <div
          className="flex flex-row items-center justify-center w-full space-x-2"
          onClick={() => props.showConfirmModal(false)}
        >
          <div className="flex flex-row items-center justify-center w-full py-2 bg-dark-600 hover:bg-dark-500 rounded-full cursor-pointer select-none transition duration-300">
            <span className="text-gray-400 text-xl max-w-sm">Cancel</span>
          </div>
          <div
            className="flex flex-row items-center justify-center w-full py-2 bg-olive-900 hover:bg-olive-800 rounded-full cursor-pointer select-none transition duration-300"
            onClick={confirm}
          >
            <span className="text-gray-400 text-xl max-w-sm">Confirm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;

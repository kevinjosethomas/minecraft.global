import { useState } from "react";
import Dropdown from "react-dropdown";
import { OnApproveData, OnApproveActions } from "@paypal/paypal-js/types/components/buttons";

import { Server } from "lib/types";
import PayPalButton from "../components/PayPalButton";

import "react-dropdown/style.css";

type PremiumProps = {
  showPremiumModal: CallableFunction;
  user: Record<string, any>;
};

function Premium(props: PremiumProps): JSX.Element {
  const servers: Record<string, any> = [];
  props.user.servers.forEach((server: Server) => {
    !server.premium && servers.push({ value: server.server_id, label: server.name });
  });

  const [selectedServer, setSelectedServer] = useState(servers[0].value);

  const onComplete = (data: OnApproveData, actions: OnApproveActions) => {
    console.log(data);
    console.log(actions);
    console.log(selectedServer);
  };

  return (
    <div
      className="fixed grid grid-flow-col content-center gap-x-10 justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-10 overflox-y-hidden"
      onClick={() => props.showPremiumModal(false)}
    >
      <div
        className="flex flex-col items-start justify-between p-10 space-y-10 bg-dark-800 border-2 border-gray-800 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start justify-start space-y-1">
          <span className="font-medium text-2xl text-gray-400">Choose a server</span>
          <Dropdown
            options={servers}
            value={servers[0]}
            className="w-96"
            controlClassName="!bg-dark-900 !rounded !border-2 !border-gray-900"
            placeholderClassName="!text-gray-400"
            menuClassName="!bg-dark-900 !rounded !border-2 !border-gray-900"
            arrowClassName="!text-gray-500"
            onChange={(e: any) => {
              setSelectedServer(e.value);
            }}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-x-3">
          <div
            className="flex flex-col flex-1 items-center justify-center h-[81px] bg-dark-600 rounded cursor-pointer hover:bg-dark-500 transition duration-300"
            onClick={() => props.showPremiumModal(false)}
          >
            <span className="font-medium text-xl text-gray-400 select-none">Cancel</span>
          </div>
          <PayPalButton onComplete={onComplete} />
        </div>
      </div>
    </div>
  );
}

export default Premium;

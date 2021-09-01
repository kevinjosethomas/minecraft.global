import toast from "react-hot-toast";
import Dropdown from "react-dropdown";
import Countdown from "react-countdown";

import Toast from "ui/components/Toast/Toast";
import { Dropdown as DropdownType, AuctionBid } from "lib/types";

import "react-dropdown/style.css";

type SystemProps = {
  bids: AuctionBid[];
  enteredBid: string;
  setEnteredBid: CallableFunction;
  numberOfBidders: number;
  auctionsEndTime: number;
  selectedServer: DropdownType;
  setSelectedServer: CallableFunction;
  dropdownOptions: DropdownType[];
  showConfirmModal: CallableFunction;
};

function System(props: SystemProps): JSX.Element {
  const onBidChange = (e: any) => {
    props.setEnteredBid(Number(e.target.value.replace(/\D/g, "")).toLocaleString());
  };

  const onBidKeyPress = (e: any) => {
    if (e.key == "Enter") {
      const value = Number(props.enteredBid.replace(",", ""));

      if (value < 10) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="Invalid bid amount provided"
            subtitle="The minimum starting bid is $10"
          />
        ));
        return;
      }

      if (props.bids.length && value <= props.bids[0].usd_amount) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="Invalid bid amount provided"
            subtitle="You must bid more than the #1 bid"
          />
        ));
        return;
      }

      props.showConfirmModal(true);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between w-full h-[26rem] p-8 bg-dark-800 rounded border-2 border-gray-900">
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-row items-center justify-start space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="font-medium text-lg text-gray-400">
            {props.numberOfBidders} bidding right now
          </span>
        </div>
        <div className="flex flex-row items-center justify-start w-full p-2 bg-dark-600 rounded">
          <span className="text-lg text-gray-400">
            Auctions end in <Countdown date={props.auctionsEndTime} />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        <span className="font-medium text-lg text-gray-400">Select a server to advertise</span>
        <Dropdown
          options={props.dropdownOptions}
          value={props.selectedServer}
          className="w-full"
          controlClassName="!bg-dark-600 !rounded !border-2 !border-gray-800"
          placeholderClassName="!text-gray-400"
          menuClassName="!bg-dark-900 !rounded !border-2 !border-gray-800"
          arrowClassName="!text-gray-500"
          onChange={(e: any) => {
            props.setSelectedServer({ label: e.label, value: e.value });
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
            value={props.enteredBid}
            onChange={onBidChange}
            onKeyPress={onBidKeyPress}
          />
        </div>
        <span className="text-gray-500">
          Hit <span className="font-bold">Enter</span> to bid
        </span>
      </div>
    </div>
  );
}

export default System;

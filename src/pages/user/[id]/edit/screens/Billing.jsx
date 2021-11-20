import moment from "moment";
import { Fragment } from "react";

export default function Billing(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full p-10 space-y-4 bg-olive-950 rounded border-2 border-olive-940">
      <h1 className="font-medium text-5xl text-white text-opacity-90">Billing</h1>
      <div className="flex flex-col items-start justify-start w-full rounded overflow-hidden">
        <div className="flex flex-row items-center justify-start w-full px-4 py-2 bg-black bg-opacity-20">
          <span className="w-[10%] font-medium text-3xl text-white text-opacity-80">Index</span>
          <span className="w-[10%] font-medium text-3xl text-white text-opacity-80">Price</span>
          <span className="w-[40%] font-medium text-3xl text-white text-opacity-80">Label</span>
          <span className="w-[20%] font-medium text-3xl text-white text-opacity-80">Server</span>
          <span className="w-[20%] font-medium text-3xl text-white text-opacity-80">Date</span>
        </div>
        {props.billing.length ? (
          <Fragment>
            {props.billing.map((bill, index) => (
              <Bill
                key={index}
                index={index + 1}
                price={`$${Math.round(bill.usd_amount * 100) / 100}`}
                label={bill.label}
                server={bill.server_id}
                date={moment(bill.paid_at).format("DD/MMM")}
              />
            ))}
          </Fragment>
        ) : (
          <div className="flex flex-row items-center justify-start w-full px-4 py-2 bg-white bg-opacity-5">
            <span className="text-2xl text-white text-opacity-70">No past transactions...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Bill(props) {
  return (
    <div
      className={`flex flex-row items-center justify-between w-full px-4 py-2 bg-white ${
        props.index % 2 === 0 ? "bg-opacity-[0.025]" : "bg-opacity-5"
      }`}
    >
      <span className="w-[10%] text-2xl text-white text-left text-opacity-70">{props.index}</span>
      <span className="w-[10%] text-2xl text-white text-opacity-70">{props.price}</span>
      <span className="w-[40%] text-2xl text-white text-opacity-70">{props.label}</span>
      <span className="w-[20%] text-2xl text-white text-opacity-70">{props.server}</span>
      <span className="w-[20%] text-2xl text-white text-opacity-70">{props.date}</span>
    </div>
  );
}

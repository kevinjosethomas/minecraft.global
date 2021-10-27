import moment from "moment";

export default function Billing(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full p-10 bg-olive-950 rounded border-2 border-olive-940">
      <h1 className="font-medium text-[50px] text-white text-opacity-90">Billing</h1>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-row items-center justify-start w-full px-4 py-2 bg-black bg-opacity-20">
          <span className="w-[10%] font-medium text-[32px] text-white text-opacity-80">Index</span>
          <span className="w-[10%] font-medium text-[32px] text-white text-opacity-80">Price</span>
          <span className="w-[40%] font-medium text-[32px] text-white text-opacity-80">Label</span>
          <span className="w-[20%] font-medium text-[32px] text-white text-opacity-80">Server</span>
          <span className="w-[20%] font-medium text-[32px] text-white text-opacity-80">Date</span>
        </div>
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
      <span className="w-[10%] text-[24px] text-white text-left text-opacity-70">
        {props.index}
      </span>
      <span className="w-[10%] text-[24px] text-white text-opacity-70">{props.price}</span>
      <span className="w-[40%] text-[24px] text-white text-opacity-70">{props.label}</span>
      <span className="w-[20%] text-[24px] text-white text-opacity-70">{props.server}</span>
      <span className="w-[20%] text-[24px] text-white text-opacity-70">{props.date}</span>
    </div>
  );
}

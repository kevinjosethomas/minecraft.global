import moment from "moment";

export default function Billing(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full rounded-lg overflow-hidden">
      <div className="flex flex-row items-center justify-start w-full py-3 px-4 bg-olive-910 select-none">
        <p className="w-[40%] font-bold text-2xl text-white tracking-wide text-opacity-90">Item</p>
        <p className="w-[20%] font-bold text-2xl text-white tracking-wide text-opacity-90">Cost</p>
        <p className="w-[30%] font-bold text-2xl text-white tracking-wide text-opacity-90">Date</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full max-h-96 overflow-y-auto">
        {props.billing.map((bill, index) => (
          <Bill key={index} index={index} {...bill} />
        ))}
      </div>
    </div>
  );
}

function Bill(props) {
  return (
    <div
      key={props.index}
      className={`flex flex-row items-center justify-start w-full py-1.5 px-4 bg-white ${
        props.index % 2 === 0 ? "bg-opacity-[0.03]" : "bg-opacity-5"
      } select-none`}
    >
      <p className="w-[40%] text-xl text-white text-opacity-80">{props.label}</p>
      <p className="w-[20%] text-xl text-white text-opacity-80">
        ${Math.round(props.usd_amount * 100) / 100}
      </p>
      <p className="w-[30%] text-xl text-white text-opacity-80">
        {moment(props.paid_at).format("MMMM Do YYYY")}
      </p>
    </div>
  );
}

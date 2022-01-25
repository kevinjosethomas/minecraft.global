import moment from "moment";

export default function Billing(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-lg">
      <div className="flex w-full select-none items-center justify-start bg-olive-910 py-3 px-4">
        <p className="w-[40%] text-2xl font-bold tracking-wide text-white text-opacity-90">
          Item
        </p>
        <p className="w-[20%] text-2xl font-bold tracking-wide text-white text-opacity-90">
          Cost
        </p>
        <p className="w-[30%] text-2xl font-bold tracking-wide text-white text-opacity-90">
          Date
        </p>
      </div>
      <div className="flex max-h-96 w-full flex-col items-start justify-start overflow-y-auto">
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
      className={`flex w-full items-center justify-start bg-white py-1.5 px-4 ${
        props.index % 2 === 0 ? "bg-opacity-[0.03]" : "bg-opacity-5"
      } select-none`}
    >
      <p className="w-[40%] text-xl text-white text-opacity-80">
        {props.label}
      </p>
      <p className="w-[20%] text-xl text-white text-opacity-80">
        ${Math.round(props.usd_amount * 100) / 100}
      </p>
      <p className="w-[30%] text-xl text-white text-opacity-80">
        {moment(props.paid_at).format("MMMM Do YYYY")}
      </p>
    </div>
  );
}

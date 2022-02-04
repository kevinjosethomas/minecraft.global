import moment from "moment";

export default function Slot(props) {
  const start = moment(props.starts_at).local();
  const end = moment(props.starts_at).local().add(7, "days");

  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl text-white text-opacity-80">
        Week: {start.format("MMM Do")} → {end.format("MMM Do")}
      </p>
      <div className="flex space-x-6">
        <div className="flex w-[200px] justify-center">
          <Button price={props.prices.vote_page} />
        </div>
        <div className="flex w-[200px] justify-center">
          <Button price={props.prices.home_page} />
        </div>
      </div>
    </div>
  );
}

function Button(props) {
  return (
    <div className="flex cursor-pointer items-center rounded bg-olive-900 px-4 py-2 transition duration-300 hover:bg-olive-800">
      <p className="select-none text-xl text-white">Buy for ${props.price}</p>
    </div>
  );
}

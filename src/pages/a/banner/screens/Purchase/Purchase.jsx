import Slot from "./components/Slot";

export default function Purchase(props) {
  return (
    <div className="flex w-full rounded-lg border-2 border-olive-940 bg-olive-950 p-6">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex items-center justify-between">
          <p className="hidden text-3xl font-medium text-white md:inline">
            Ad Duration
          </p>
          <div className="flex w-full justify-between space-x-3 md:w-auto md:justify-start md:space-x-6">
            <p className="flex justify-center text-2xl font-medium text-white md:w-[200px] md:text-3xl">
              Vote Page
            </p>
            <p className="flex justify-center text-2xl font-medium text-white md:w-[200px] md:text-3xl ">
              Home Page
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col space-y-8 md:space-y-2">
          {props.slots.map((slot, index) => (
            <Slot
              key={index}
              {...slot}
              prices={props.prices}
              products={props.products}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

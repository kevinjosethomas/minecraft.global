import Slot from "./components/Slot";

export default function Products(props) {
  return (
    <div className="flex w-full rounded-lg border-2 border-olive-940 bg-olive-950 p-6">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-3xl font-medium text-white">Ad Duration</p>
          <div className="flex space-x-6">
            <p className="flex w-[200px] justify-center text-3xl font-medium text-white">
              Vote Page
            </p>
            <p className="flex w-[200px] justify-center text-3xl font-medium text-white ">
              Home Page
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col space-y-2">
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

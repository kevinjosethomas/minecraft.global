import Advertisement from "./Advertisement";

export default function Advertisements(props) {
  return (
    <div className="flex w-full flex-col space-y-4 md:space-y-2">
      {props.slots.map((slot, index) => (
        <Advertisement key={index} index={index} {...slot} />
      ))}
    </div>
  );
}

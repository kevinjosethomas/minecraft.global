import ServerCard from "./ServerCard";

export default function Popup(props) {
  return (
    <div className="absolute top-[85px] left-0 flex flex-col items-start justify-start w-full h-72 p-6 rounded-[12px] bg-olive-940 bg-opacity-50 border-2 border-olive-940">
      <div className="grid grid-cols-3 gap-5 w-full">
        {props.results.map((server) => (
          <ServerCard key={server.server_id} {...server} />
        ))}
      </div>
    </div>
  );
}

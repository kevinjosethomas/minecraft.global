import ServerCard from "./ServerCard";

export default function Popup(props) {
  return (
    <div className="absolute top-[85px] left-0 flex flex-col items-start justify-start w-full p-6 rounded-[12px] bg-olive-940 bg-opacity-50 border-2 border-olive-940">
      <div className="flex flex-col items-start justify-start w-full space-y-2">
        <div className="flex flex-row items-center justify-start space-x-1.5">
          <i className="far fa-search text-[20px] text-white text-opacity-80" />
          <span className="font-medium text-[20px] text-white text-opacity-80 tracking-tight">
            SEARCH RESULTS...
          </span>
        </div>
        <div className="grid grid-cols-3 gap-5 w-full">
          {props.results.map((server) => (
            <ServerCard key={server.server_id} {...server} />
          ))}
        </div>
      </div>
    </div>
  );
}

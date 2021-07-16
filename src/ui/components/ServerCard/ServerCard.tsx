import SimplifyNumber from "simplify-number";

import { Server } from "lib/types";

function ServerCard(props: Server): JSX.Element {
  return (
    <div
      key={props.server_id}
      className="flex flex-col items-start justify-start w-80 md:w-100 h-92 md:h-87.5 p-6 space-y-6 bg-dark-600 border-2 border-gray-800 rounded"
    >
      <div className="flex flex-row items-center justify-start w-full space-x-4 overflox-x-hidden whitespace-nowrap">
        <div className="relative flex flex-col items-center justify-center overflow-elipsis">
          <div className="absolute w-16 h-16 bg-dark-300 bg-opacity-30 rounded" />
          <img src={props.favicon} alt={props.name} className="w-16 h-16 min-w-[4rem] rounded" />
        </div>
        <span className="font-bold text-5xl text-gray-300 tracking-tight truncate">
          {props.name}
        </span>
      </div>
      <div className="flex flex-col items-start justify-start w-full h-full space-y-3 overflow-x-hidden">
        <div className="flex flex-row items-center justify-start space-x-2">
          <div className="flex flex-row items-center justify-center px-2 py-1 space-x-2 bg-dark-700 rounded">
            <i className="far fa-arrow-alt-up text-sm text-gray-400" />
            <span className="text-sm font-medium text-gray-400 select-none">
              {SimplifyNumber(props.monthly_votes, { decimal: 1 }).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-row items-center justify-center px-2 py-1 space-x-2 bg-dark-700 rounded">
            <i className="far fa-user text-sm text-gray-400" />
            <span className="text-sm font-medium text-gray-400 select-none">
              {SimplifyNumber(props.players_online, { decimal: 1 }).toUpperCase()}
            </span>
          </div>
          {props.tags.map((tag: string) => (
            <div
              key={tag}
              className="flex flex-row items-center justify-center px-2 py-1 bg-dark-700 rounded"
            >
              <span className="text-sm font-medium text-gray-400 select-none whitespace-nowrap">
                {tag}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-start">
          <span className="font-medium text- text-gray-400">{props.description}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full space-x-4 rounded">
        <div className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300">
          <span className="font-medium text-gray-400 select-none">Copy IP</span>
        </div>
        <div className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300">
          <span className="font-medium text-gray-400 select-none">View Server</span>
        </div>
      </div>
    </div>
  );
}

export default ServerCard;

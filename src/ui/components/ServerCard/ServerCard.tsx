import Link from "next/link";
import toast from "react-hot-toast";

import { Server } from "lib/types";
import Tags from "./components/Tags";
import Identity from "./components/Identity";
import Toast from "ui/components/Toast/Toast";
import Description from "./components/Description";

function ServerCard(props: Server): JSX.Element {
  function CopyIP() {
    const ip = props.port === 25565 ? props.host : `${props.host}:${props.port}`;
    navigator.clipboard.writeText(ip);
    toast.custom((t) => (
      <Toast
        icon="fas fa-check-circle text-green-600"
        title="Successfully copied IP Address!"
        subtitle={`Copied ${ip} to your clipboard!`}
      />
    ));
  }

  return (
    <div
      key={props.server_id}
      className="flex flex-col items-start justify-start w-80 md:w-100 h-92 md:h-87.5 p-6 space-y-6 bg-dark-600 border-2 border-gray-800 rounded"
    >
      <Identity favicon={props.favicon} name={props.name} />
      <div className="flex flex-col items-start justify-start w-full h-full space-y-3 overflow-x-hidden">
        <Tags
          monthly_votes={props.monthly_votes}
          players_online={props.players_online}
          tags={props.tags}
        />
        <Description description={props.description} />
      </div>
      <div className="flex flex-row items-center justify-between w-full space-x-4 rounded">
        <div
          className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300"
          onClick={CopyIP}
        >
          <span className="font-medium text-gray-400 select-none">Copy IP</span>
        </div>
        <Link href={`/server/${props.server_id}`}>
          <a className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300">
            <span className="font-medium text-gray-400 select-none">View Server</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ServerCard;

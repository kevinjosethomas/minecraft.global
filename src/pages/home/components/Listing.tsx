import { useMediaQuery } from "react-responsive";

import { Server } from "lib/types";
import ServerCard from "ui/components/ServerCard/ServerCard";

type Listing = {
  title: string;
  subtitle: string;
  icon: string;
  data: Server[];
};

function Listing(props: Listing): JSX.Element {
  const is1080p = useMediaQuery({ minWidth: 1920 });

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-4">
      <div className="flex flex-row items-center justify-start space-x-4">
        <i className={`${props.icon} text-5xl md:text-6xl text-olive-400`} />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold text-2xl md:text-4xl 3xl:text-5xl text-gray-300">
            {props.title}
          </span>
          <span className="font-medium text-sm md:text-xl 3xl:text-2xl text-gray-400">
            {props.subtitle}
          </span>
        </div>
      </div>
      {props.data ? (
        <div className="grid grid-flow-row md:grid-flow-col justify-between w-full gap-y-10 md:gap-y-0 lg:gap-x-5 xl:gap-x-0 overflow-x-scroll no-scrollbar">
          {props.data.slice(0, is1080p ? 4 : 3).map((server: Server) => (
            <ServerCard key={server.server_id} {...server} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Listing;

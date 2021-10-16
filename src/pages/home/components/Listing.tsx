import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import { Server } from "lib/types";
import ServerCard, { ServerCardSkeleton } from "ui/components/ServerCard/ServerCard";

type Listing = {
  user?: Record<string, any>;
  title: string;
  subtitle: string;
  icon: string;
  data: Server[];
  link: string;
};

function Listing(props: Listing): JSX.Element {
  const is1080p = useMediaQuery({ minWidth: 1920 });

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-4">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center justify-start space-x-4">
          <i className={`${props.icon} text-5xl md:text-6xl text-olive-400`} />
          <div className="flex flex-col items-start justify-center">
            <h2 className="font-bold text-2xl md:text-4xl 3xl:text-5xl text-gray-300">
              {props.title}
            </h2>
            <h3 className="font-medium text-sm md:text-xl 3xl:text-2xl text-gray-400">
              {props.subtitle}
            </h3>
          </div>
        </div>
        <Link href={props.link}>
          <a>
            <i className="far fa-chevron-right text-3xl text-gray-300 hover:translate-x-2.5 transition duration-500 delay-200" />
          </a>
        </Link>
      </div>
      <div className="grid grid-flow-row md:grid-flow-col justify-between w-full gap-y-10 md:gap-y-0 lg:gap-x-5 xl:gap-x-0 overflow-x-scroll no-scrollbar">
        {props.data ? (
          <>
            {props.data.slice(0, is1080p ? 4 : 3).map((server: Server) => (
              <ServerCard key={server.server_id} {...server} user={props.user} />
            ))}
          </>
        ) : (
          <>
            {(is1080p ? [1, 2, 3, 4] : [1, 2, 3]).map((num: number) => (
              <ServerCardSkeleton key={num} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Listing;

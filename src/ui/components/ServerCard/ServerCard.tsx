import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

import { Server } from "lib/types";
import Tags from "./components/Tags";
import Buttons from "./components/Buttons";
import Identity from "./components/Identity";
import Description from "./components/Description";

function ServerCard(props: Server): JSX.Element {
  return (
    <>
      <ReactTooltip
        effect="solid"
        className="!bg-dark-600 !border-2 !border-gray-800 !text-gray-300 !font-medium"
      />
      <div
        key={props.server_id}
        className={`relative flex flex-col items-start justify-start w-80 lg:w-96 xl:w-88 2xl:w-96 h-84 md:h-88 xl:h-84 2xl:h-90 p-6 space-y-6 bg-dark-600 border-2 ${
          props.premium ? "border-olive-700" : "border-gray-800"
        } rounded`}
      >
        <Identity favicon={props.favicon} name={props.name} />
        <div className="flex flex-col items-start justify-start w-full h-full space-y-3 overflow-x-hidden no-scrollbar">
          <Tags
            monthly_votes={props.monthly_votes}
            players_online={props.players_online}
            tags={props.tags}
          />
          <Description description={props.description} />
        </div>
        <Buttons
          user={props.user}
          server_id={props.server_id}
          owner_id={props.owner_id}
          host={props.host}
          port={props.port}
          premium={props.premium}
        />
        {props.premium && (
          <i
            data-tip="Premium Server"
            className="fad fa-diamond text-3xl text-olive-500 absolute -top-2 right-4"
          />
        )}
      </div>
    </>
  );
}

export default ServerCard;

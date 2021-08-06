import { Server } from "lib/types";
import Tags from "./components/Tags";
import Buttons from "./components/Buttons";
import Identity from "./components/Identity";
import Description from "./components/Description";

function ServerCard(props: Server): JSX.Element {
  return (
    <div
      key={props.server_id}
      className={`relative flex flex-col items-start justify-start w-80 md:w-100 h-92 md:h-87.5 p-6 space-y-6 bg-dark-600 border-2 ${
        props.premium ? "border-olive-700" : "border-gray-800"
      } rounded`}
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
      <Buttons
        server_id={props.server_id}
        host={props.host}
        port={props.port}
        premium={props.premium}
      />
      {props.premium && (
        <i className="fad fa-diamond text-3xl text-olive-500 absolute -top-2 right-4" />
      )}
    </div>
  );
}

export default ServerCard;

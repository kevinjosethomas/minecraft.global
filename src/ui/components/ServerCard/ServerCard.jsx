import Link from "next/link";

import Tags from "./components/Tags";
import Favicon from "./components/Favicon";
import Identity from "./components/Identity";
import Description from "./components/Description";

export default function ServerCard(props) {
  return (
    <Link href={`/server/${props.server_id}`} passHref>
      <div className="flex flex-col items-start justify-start w-full p-6 space-y-2 bg-white bg-opacity-[0.06] hover:bg-opacity-[0.08] transition duration-300 cursor-pointer">
        <div className="flex flex-row items-start justify-start space-x-3 w-full">
          <Favicon favicon={props.favicon} name={props.name} />
          <Identity
            name={props.name}
            host={props.host}
            port={props.port}
            monthly_votes={props.monthly_votes}
            players_online={props.players_online}
          />
        </div>
        <Description description={props.description} />
        <Tags tags={props.tags} />
      </div>
    </Link>
  );
}

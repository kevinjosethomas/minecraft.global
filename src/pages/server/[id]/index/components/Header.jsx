import Upvote from "./Upvote";
import Identity from "./Identity";

export default function Header(props) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Identity
        name={props.name}
        tags={props.tags}
        favicon={props.favicon}
        description={props.description}
        premium={props.premium}
      />
      <Upvote server_id={props.server_id} monthly_votes={props.monthly_votes} />
    </div>
  );
}

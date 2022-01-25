import Upvote from "./Upvote";
import Identity from "./Identity";

export default function Header(props) {
  return (
    <div className="flex w-full flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
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

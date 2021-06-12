import Connection from "../components/Connection";

function Connections(props) {
  return (
    <div className="flex flex-row items-start justify-start flex-wrap w-full space-x-6">
      {props.user.discord_id && (
        <Connection type="discord" label={props.user.discord_id} />
      )}
      {props.user.google_id && (
        <Connection type="email" label={props.user.email} />
      )}
    </div>
  );
}

export default Connections;

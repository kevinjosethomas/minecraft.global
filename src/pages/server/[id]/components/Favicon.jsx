export default function Favicon(props) {
  return (
    <img
      className="rounded"
      src={props.favicon || "/images/default_server_favicon.png"}
      alt={`${props.name}'s favicon'`}
      draggable="false"
    />
  );
}

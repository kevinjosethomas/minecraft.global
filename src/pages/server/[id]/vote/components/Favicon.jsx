export default function Favicon(props) {
  return (
    <img
      className="rounded w-[48px] h-[48px]"
      src={props.favicon || "/images/default_server_favicon.png"}
      alt={`${props.name}'s favicon'`}
      draggable="false"
    />
  );
}

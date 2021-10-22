export default function Favicon(props) {
  return (
    <img
      alt={`${props.name}'s Logo`}
      src={props.favicon || "/images/default_server_favicon.png"}
      className="w-[78px] h-[78px] rounded-full"
      draggable="false"
    />
  );
}

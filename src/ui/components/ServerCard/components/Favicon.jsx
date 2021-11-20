export default function Favicon(props) {
  return (
    <img
      alt={`${props.name}'s Logo`}
      src={props.favicon || "/images/default_server_favicon.png"}
      className="w-[48px] md:w-[66px] h-[48px] md:h-[66px] rounded-full"
      draggable="false"
    />
  );
}

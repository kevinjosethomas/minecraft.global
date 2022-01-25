export default function Favicon(props) {
  return (
    <img
      alt={`${props.name}'s Logo`}
      src={props.favicon || "/images/default_server_favicon.png"}
      className="h-[48px] w-[48px] rounded-full md:h-[66px] md:w-[66px]"
      draggable="false"
    />
  );
}

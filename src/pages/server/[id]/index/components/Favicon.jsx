export default function Favicon(props) {
  return (
    <img
      className="w-[64px] rounded"
      src={props.favicon || "/images/icons/default_favicon.png"}
      alt={`${props.name}'s favicon'`}
      draggable="false"
    />
  );
}

export default function Favicon(props) {
  return (
    <img
      className="h-[48px] w-[48px] rounded"
      src={props.favicon || "/images/icons/default_favicon.png"}
      alt={`${props.name}'s favicon'`}
      draggable="false"
    />
  );
}

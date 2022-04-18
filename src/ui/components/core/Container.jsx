export default function Container(props) {
  return (
    <div
      className={`${props.className} rounded-lg border-2 border-olive-900 bg-olive-910`}
    >
      {props.children}
    </div>
  );
}

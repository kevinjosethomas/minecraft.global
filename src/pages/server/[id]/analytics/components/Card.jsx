export default function Card(props) {
  return (
    <div className="flex flex-col items-start justify-start p-5 bg-olive-950 rounded border-2 border-olive-940">
      <p className="font-medium text-2xl text-white text-opacity-70">{props.label}</p>
      <p className="text-4xl text-white text-opacity-90">{props.value}</p>
    </div>
  );
}

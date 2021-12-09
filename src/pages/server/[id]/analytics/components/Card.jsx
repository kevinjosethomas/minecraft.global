export default function Card(props) {
  return (
    <div className="flex flex-col items-start justify-between p-5 space-y-4 bg-olive-950 rounded border-2 border-olive-940 overflow-hidden">
      <div className="flex flex-col items-start justify-start">
        <p className="font-medium text-2xl text-white text-opacity-70">{props.title}</p>
        <p className="text-white text-opacity-60">{props.subtitle}</p>
      </div>

      <p className="max-w-full text-4xl text-white text-opacity-80">{props.value}</p>
    </div>
  );
}

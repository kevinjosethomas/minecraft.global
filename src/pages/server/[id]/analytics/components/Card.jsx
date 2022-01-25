export default function Card(props) {
  return (
    <div className="flex flex-col items-start justify-between space-y-4 overflow-hidden rounded border-2 border-olive-940 bg-olive-950 p-5">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl font-medium text-white text-opacity-70">
          {props.title}
        </p>
        <p className="text-white text-opacity-60">{props.subtitle}</p>
      </div>

      <p className="max-w-full text-4xl text-white text-opacity-80">
        {props.value}
      </p>
    </div>
  );
}

export default function Input(props) {
  return (
    <div className="flex flex-col items-start justify-start">
      <h3 className="font-medium text-3xl text-white text-opacity-80">{props.label}</h3>
      <input
        value={props.value}
        onChange={props.onChange}
        className="w-72 px-2 py-1 bg-white bg-opacity-5 focus:outline-none rounded text-xl text-white text-opacity-80 border-2 border-olive-920"
      />
    </div>
  );
}

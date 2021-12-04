export default function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-1">
      <h3 className="font-medium text-3xl text-white text-opacity-80">{props.label}</h3>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="w-[500px] h-56 px-2 py-1 bg-white bg-opacity-5 resize-none focus:outline-none rounded text-xl text-white text-opacity-80 border-2 border-white border-opacity-10"
      />
    </div>
  );
}

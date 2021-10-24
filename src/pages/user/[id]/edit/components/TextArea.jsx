export default function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-start">
      <h3 className="font-medium text-[32px] text-white text-opacity-80">{props.label}</h3>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="w-[600px] h-56 px-2 py-1 bg-white bg-opacity-10 resize-none focus:outline-none rounded text-[22px] text-white text-opacity-80 border-2 border-olive-920"
      />
    </div>
  );
}

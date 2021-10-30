export default function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-start">
      <span className="text-[32px] text-white text-opacity-80">{props.label}</span>
      <textarea
        className="w-[500px] h-[200px] p-4 bg-black bg-opacity-20 resize-none focus:outline-none rounded text-[20px] text-white text-opacity-80"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

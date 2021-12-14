export default function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-start">
      <p className="text-3xl text-white text-opacity-80">{props.label}</p>
      <textarea
        className="w-[400px] 2xl:w-[500px] h-[150px] 2xl:h-[200px] p-4 bg-black bg-opacity-20 resize-none focus:outline-none rounded text-xl text-white text-opacity-80"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-start">
      <p className="text-3xl text-white text-opacity-80">{props.label}</p>
      <textarea
        className="focus:outline-none h-[150px] w-[400px] resize-none rounded bg-black bg-opacity-20 p-4 text-xl text-white text-opacity-80 2xl:h-[200px] 2xl:w-[500px]"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

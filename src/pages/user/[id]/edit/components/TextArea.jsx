export default function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-1">
      <h3 className="text-3xl font-medium text-white text-opacity-80">
        {props.label}
      </h3>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="focus:outline-none h-56 w-[500px] resize-none rounded border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-2 py-1 text-xl text-white text-opacity-80"
      />
    </div>
  );
}

export default function TextArea(props) {
  return (
    <div className="flex flex-row items-start justify-between w-full space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">
          {props.label}
          {props.required && <span className="ml-1 text-xl text-red-800 select-none">*</span>}
        </p>
        <p className="text-lg text-white text-opacity-60 leading-tight">{props.description}</p>
      </div>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="min-w-[450px] min-h-[200px] p-3 text-lg text-white text-opacity-80 resize-none bg-white bg-opacity-5 border-2 border-white border-opacity-10 focus:outline-none rounded-md"
      />
    </div>
  );
}

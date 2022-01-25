export default function TextArea(props) {
  return (
    <div className="flex w-full items-start justify-between space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">
          {props.label}
          {props.required && (
            <span className="ml-1 select-none text-xl text-red-800">*</span>
          )}
        </p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          {props.description}
        </p>
      </div>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="focus:outline-none min-h-[200px] min-w-[450px] resize-none rounded-md border-2 border-white border-opacity-10 bg-white bg-opacity-5 p-3 text-lg text-white text-opacity-80"
      />
    </div>
  );
}

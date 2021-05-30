function TextArea(props) {
  return (
    <div
      className={`relative flex flex-col items-start justify-center ${props.parentClassName}`}
    >
      <span className="font-medium text-lg text-gray-400">{props.label}</span>
      <textarea
        maxLength={props.maxLength}
        className={`${
          props.className
        } px-2 py-1 font-medium text-gray-500 bg-dark-70 focus:outline-none rounded-sm resize-none ${
          props.counter && "pr-14"
        }`}
        defaultValue={props.default}
        onChange={props.onChange}
      />
      {props.counter && props.maxLength && (
        <span className="absolute top-8 right-2 font-medium text-gray-500">
          {props.maxLength - (props.default ? props.default.length : 0)}
        </span>
      )}
    </div>
  );
}

export default TextArea;

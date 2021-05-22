function TextArea(props) {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-medium text-lg text-gray-400">{props.label}</span>
      <textarea
        maxLength={props.maxLength}
        className={`${props.className} px-2 py-1 font-medium text-gray-500 bg-dark-70 focus:outline-none rounded-sm resize-none`}
        onChange={props.onChange}
      />
    </div>
  );
}

export default TextArea;

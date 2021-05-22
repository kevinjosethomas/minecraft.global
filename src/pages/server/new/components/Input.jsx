function Input(props) {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-medium text-lg text-gray-400">{props.label}</span>
      <input
        className="w-full px-2 py-1 font-medium text-gray-500 bg-dark-70 focus:outline-none rounded-sm"
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;

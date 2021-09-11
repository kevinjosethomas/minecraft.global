type InputProps = {
  label: string;
};

function Input(props: InputProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
      <input className="w-64 h-8 px-2 py-2 text-gray-400 bg-dark-500 focus:outline-none rounded" />
    </div>
  );
}

export default Input;

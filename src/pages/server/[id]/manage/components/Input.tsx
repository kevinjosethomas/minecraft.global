type InputProps = {
  label: string;
  value: string;
  setValue: CallableFunction;
};

function Input(props: InputProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start space-y-1">
      <span className="font-medium text-3xl text-gray-400">{props.label}</span>
      <input className="w-64 px-2 py-1 bg-dark-600 text-gray-400 rounded border-2 border-gray-900 focus:outline-none" />
    </div>
  );
}

export default Input;

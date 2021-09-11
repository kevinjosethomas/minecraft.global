import { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler;
};

function Input(props: InputProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
      <input
        className="w-64 h-8 px-2 py-2 text-gray-400 bg-dark-600 focus:outline-none rounded border-2 border-gray-800"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;

import { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  value: string;
  setValue: ChangeEventHandler;
};

function Input(props: InputProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start space-y-1 w-full md:w-auto">
      <span className="font-medium text-2xl md:text-3xl text-gray-400">{props.label}</span>
      <input
        value={props.value}
        onChange={props.setValue}
        className="w-full md:w-64 px-2 py-1 bg-dark-600 text-lg text-gray-400 rounded border-2 border-gray-900 focus:outline-none"
      />
    </div>
  );
}

export default Input;

import { ChangeEventHandler } from "react";

type TextAreaProps = {
  label: string;
  value: string;
  height: string;
  setValue: ChangeEventHandler;
};

function TextArea(props: TextAreaProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-medium text-3xl text-gray-400">{props.label}</span>
      <textarea
        className={`w-64 md:w-96 ${props.height} px-2 py-1 text-lg text-gray-400 bg-dark-600 focus:outline-none rounded resize-none border-2 border-gray-900`}
        value={props.value}
        onChange={props.setValue}
      />
    </div>
  );
}

export default TextArea;

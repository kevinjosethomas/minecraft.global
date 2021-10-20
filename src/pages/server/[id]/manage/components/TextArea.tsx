import { ChangeEventHandler } from "react";

type TextAreaProps = {
  label: string;
  value: string;
  height: string;
  setValue: ChangeEventHandler;
};

function TextArea(props: TextAreaProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center w-full md:w-auto">
      <span className="font-medium text-2xl md:text-3xl text-gray-400">{props.label}</span>
      <textarea
        className={`w-full md:w-96 ${props.height} px-2 py-1 md:text-lg text-gray-400 bg-dark-600 focus:outline-none rounded resize-none border-2 border-gray-900`}
        value={props.value}
        onChange={props.setValue}
      />
    </div>
  );
}

export default TextArea;

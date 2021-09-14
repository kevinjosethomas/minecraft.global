import { MouseEventHandler } from "react";

type RadioProps = {
  label: string;
  selected: boolean;
  onClick: MouseEventHandler;
};

function Radio(props: RadioProps): JSX.Element {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2 cursor-pointer"
      onClick={props.onClick}
    >
      <div
        className={`flex flex-col items-center justify-center w-6 h-6 ${
          props.selected ? "border-4 border-olive-800" : "bg-dark-400"
        } rounded-full`}
      >
        {props.selected && <div className="w-2 h-2 bg-olive-800 rounded-full" />}
      </div>
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
    </div>
  );
}

export default Radio;

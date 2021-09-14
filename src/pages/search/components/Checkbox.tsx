import { MouseEventHandler } from "react";

type CheckBoxProps = {
  label: string;
  selected: boolean;
  onClick: MouseEventHandler;
};

function CheckBox(props: CheckBoxProps): JSX.Element {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2 select-none cursor-pointer"
      onClick={props.onClick}
    >
      <div
        className={`flex flex-col items-center justify-center w-6 h-6 ${
          props.selected ? "bg-olive-800" : "bg-dark-400"
        } rounded`}
      >
        {props.selected && <i className="fas fa-check text-xs text-dark-800" />}
      </div>
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
    </div>
  );
}

export default CheckBox;

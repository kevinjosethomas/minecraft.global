import { MouseEventHandler } from "react";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onClick: MouseEventHandler;
};

function Checkbox(props: CheckboxProps): JSX.Element {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2 select-none cursor-pointer"
      onClick={props.onClick}
    >
      <div
        className={`flex flex-col items-center justify-center w-6 h-6 ${
          props.checked ? "bg-olive-700" : "bg-dark-200"
        } rounded`}
      >
        {props.checked && <i className="fas fa-check text-xs text-dark-400" />}
      </div>
      <span className="text-xl text-gray-400">{props.label}</span>
    </div>
  );
}

export default Checkbox;

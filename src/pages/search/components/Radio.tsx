import { MouseEventHandler } from "react";

type RadioProps = {
  label: string;
  selected: boolean;
  onClick: MouseEventHandler;
};

function Radio(props: RadioProps): JSX.Element {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2 select- cursor-pointer"
      onClick={props.onClick}
    >
      <div
        className={`w-6 h-6 rounded-full ${
          props.selected && "border-4 border-olive-700"
        } bg-dark-200`}
      />
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
    </div>
  );
}

export default Radio;

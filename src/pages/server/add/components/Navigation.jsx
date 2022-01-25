import { useEffect, useState } from "react";

export default function Navigation(props) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const d = props.details;
    if (d.name && d.host && d.description && d.tags && d.long_description) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [props.details]);

  return (
    <div className="flex min-w-[300px] max-w-[300px] flex-col items-start justify-start space-y-4">
      <div className="flex w-full flex-col items-start justify-start space-y-4 rounded-lg border-2 border-olive-930 bg-olive-950 p-5">
        <div className="flex w-full flex-col items-start justify-start space-y-1.5 px-2">
          {props.screens.map((screen, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2.5"
              onClick={() => props.setScreen(screen)}
            >
              <i
                className={`${screen.icon} w-[25px] text-center text-xl ${
                  props.screen.name === screen.name
                    ? "text-olive-500"
                    : "text-white text-opacity-90"
                }`}
              />
              <p className="select-none text-xl text-white text-opacity-90">
                {screen.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex w-full flex-col items-center justify-center py-3 ${
          completed
            ? "cursor-pointer bg-olive-900 transition duration-300 hover:bg-olive-800"
            : "cursor-not-allowed bg-olive-960"
        } rounded-lg`}
        onClick={completed ? props.submit : void 0}
      >
        <p className="select-none text-xl text-white text-opacity-90">
          Add Server
        </p>
      </div>
    </div>
  );
}

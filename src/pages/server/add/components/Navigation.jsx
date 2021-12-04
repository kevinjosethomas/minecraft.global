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
    <div className="flex flex-col items-start justify-start min-w-[300px] max-w-[300px] space-y-4">
      <div className="flex flex-col items-start justify-start w-full p-5 space-y-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
        <div className="flex flex-col items-start justify-start w-full px-2 space-y-1.5">
          {props.screens.map((screen, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-start w-full space-x-2.5 cursor-pointer"
              onClick={() => props.setScreen(screen)}
            >
              <i
                className={`${screen.icon} w-[25px] text-xl text-center ${
                  props.screen.name === screen.name
                    ? "text-olive-500"
                    : "text-white text-opacity-90"
                }`}
              />
              <p className="text-xl text-white text-opacity-90 select-none">{screen.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center w-full py-3 ${
          completed
            ? "bg-olive-900 hover:bg-olive-800 cursor-pointer transition duration-300"
            : "bg-olive-960 cursor-not-allowed"
        } rounded-lg`}
        onClick={completed ? props.submit : void 0}
      >
        <p className="text-xl text-white text-opacity-90 select-none">Add Server</p>
      </div>
    </div>
  );
}

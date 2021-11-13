import { useState } from "react";

import Toggle from "./Toggle";
import Duration from "./Duration";
import ChartView from "./ChartView";

export default function Chart(props) {
  const [type, setType] = useState(0);
  const [duration, setDuration] = useState(7);

  return (
    <div className="flex flex-col items-start justify-between min-w-[60%] p-8 bg-olive-950 rounded border-2 border-olive-940 select-none">
      <div className="flex flex-row items-center justify-between w-full">
        <Toggle types={props.types} type={type} setType={setType} />
        <Duration active={duration} setActive={setDuration} />
      </div>
      <ChartView
        data={props.types[type].data[duration]}
        labels={props.labels[duration]}
        duration={duration}
        negative={props.types[type].negative}
      />
      {props.children}
    </div>
  );
}

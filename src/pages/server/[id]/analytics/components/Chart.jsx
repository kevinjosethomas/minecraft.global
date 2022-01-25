import { useState } from "react";

import Toggle from "./Toggle";
import Duration from "./Duration";
import ChartView from "./ChartView";

export default function Chart(props) {
  const [type, setType] = useState(0);
  const [duration, setDuration] = useState(7);

  return (
    <div className="flex min-w-[60%] select-none flex-col items-start justify-between rounded border-2 border-olive-940 bg-olive-950 p-8">
      <div className="flex w-full items-center justify-between">
        <Toggle types={props.types} type={type} setType={setType} />
        <Duration active={duration} setActive={setDuration} />
      </div>
      <ChartView
        duration={duration}
        labels={props.labels[duration]}
        data={props.types[type].data[duration]}
        negative={props.types[type].negative}
        Ycallback={props.Ycallback}
      />
      {props.children}
    </div>
  );
}

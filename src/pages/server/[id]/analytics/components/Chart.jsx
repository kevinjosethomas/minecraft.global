import { useState } from "react";

import LineChart from "./LineChart";

export default function PlayersTotal(props) {
  const [active, setActive] = useState(7);
  const [open, setOpen] = useState(false);

  const data = {
    1: props.fetch(props.value, 1),
    7: props.fetch(props.value, 7),
    15: props.fetch(props.value, 15),
    30: props.fetch(props.value, 30),
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-8 space-y-4 bg-olive-950 rounded-lg border-2 border-olive-920">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="font-medium text-3xl text-white text-opacity-80">{props.label}</p>

        <div className="flex flex-row items-center justify-center space-x-4 rounded overflow-hidden">
          {open && (
            <div className="flex flex-row items-center justify-center space-x-1">
              {props.durations.map((time, index) => (
                <Time key={index} time={time} active={active} setActive={setActive} />
              ))}
            </div>
          )}
          <div
            className="flex flex-row items-center justify-center"
            onClick={() => setOpen((x) => !x)}
          >
            <i className="far fa-angle-down text-3xl text-white text-opacity-80" />
          </div>
        </div>
      </div>
      {open && <Chart duration={active} labels={props.labels[active]} data={data[active]} />}
    </div>
  );
}

function Time(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center px-3 ${
        props.active === props.time ? "bg-olive-920" : "bg-olive-940"
      } cursor-pointer select-none`}
      onClick={() => props.setActive(props.time)}
    >
      <p className="text-lg text-white text-opacity-70">{props.time}d</p>
    </div>
  );
}

function Chart(props) {
  return (
    <LineChart
      precision={0}
      duration={props.duration}
      data={{
        labels: props.labels,
        datasets: [
          {
            backgroundColor: "#448361",
            borderColor: "#2E5841",
            data: props.data,
          },
        ],
      }}
    />
  );
}

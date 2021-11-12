import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LineChart from "./LineChart";

export default function ChartLayout(props) {
  const [active, setActive] = useState(7);

  const data = {
    1: props.fetch(props.value, 1),
    7: props.fetch(props.value, 7),
    15: props.fetch(props.value, 15),
    30: props.fetch(props.value, 30),
  };

  return (
    <div className="flex flex-col items-start justify-start min-w-[60%] p-8 space-y-4 bg-olive-950 rounded border-2 border-olive-940 select-none">
      <Header
        active={active}
        label={props.label}
        setActive={setActive}
        durations={props.durations}
      />
      <AnimatePresence>
        {open && (
          <Chart
            duration={active}
            negative={props.negative}
            labels={props.labels[active]}
            tickYCallback={props.tickYCallback}
            data={data[active]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Header(props) {
  return (
    <div className="flex flex-row items-center justify-between w-full cursor-pointer">
      <p className="font-medium text-3xl text-white text-opacity-80">{props.label}</p>
      <div className="flex flex-row items-center justify-center space-x-4 rounded overflow-hidden">
        <div className="flex flex-row items-center justify-center space-x-1">
          {props.durations.map((time, index) => (
            <Time key={index} time={time} active={props.active} setActive={props.setActive} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Time(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center px-3 ${
        props.active === props.time ? "bg-olive-920" : "bg-olive-940"
      } cursor-pointer select-none`}
      onClick={(e) => {
        e.stopPropagation();
        props.setActive(props.time);
      }}
    >
      <p className="text-lg text-white text-opacity-70">{props.time}d</p>
    </div>
  );
}

function Chart(props) {
  return (
    <motion.div className="flex flex-col items-start justify-start w-full">
      <LineChart
        precision={0}
        negative={props.negative}
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
        tickYCallback={props.tickYCallback}
      />
    </motion.div>
  );
}

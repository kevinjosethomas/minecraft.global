import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LineChart from "../components/LineChart";

export default function ChartLayout(props) {
  const [active, setActive] = useState(7);
  const [open, setOpen] = useState(false);

  const data = {
    1: props.fetch(props.value, 1),
    7: props.fetch(props.value, 7),
    15: props.fetch(props.value, 15),
    30: props.fetch(props.value, 30),
  };

  return (
    <div
      className={`flex flex-col items-start justify-start w-full p-8 space-y-8 bg-olive-950 rounded-lg border-2 border-olive-920 ${
        !open && "cursor-pointer"
      } select-none`}
      onClick={() => !open && setOpen(true)}
    >
      <Header
        open={open}
        active={active}
        setOpen={setOpen}
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
            data={data[active]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Header(props) {
  return (
    <div
      className="flex flex-row items-center justify-between w-full cursor-pointer"
      onClick={() => props.setOpen((x) => !x)}
    >
      <p className="font-medium text-3xl text-white text-opacity-80">{props.label}</p>

      <div className="flex flex-row items-center justify-center space-x-4 rounded overflow-hidden">
        {props.open && (
          <div className="flex flex-row items-center justify-center space-x-1">
            {props.durations.map((time, index) => (
              <Time key={index} time={time} active={props.active} setActive={props.setActive} />
            ))}
          </div>
        )}
        <div className="flex flex-row items-center justify-center">
          <i className="far fa-angle-down text-3xl text-white text-opacity-80" />
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
    <motion.div
      className="flex flex-col items-start justify-start w-full overflow-hidden"
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.3 }}
    >
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
      />
    </motion.div>
  );
}

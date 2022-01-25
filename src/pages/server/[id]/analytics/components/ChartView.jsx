import LineChart from "./LineChart";

export default function ChartLayout(props) {
  return (
    <Chart
      data={props.data}
      duration={props.duration}
      negative={props.negative}
      labels={props.labels}
      Ycallback={props.Ycallback}
    />
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
      Ycallback={props.Ycallback}
    />
  );
}

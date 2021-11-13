import Toggle from "./Toggle";
import Duration from "./Duration";
import ChartView from "./ChartView";

export default function Chart(props) {
  return (
    <div className="flex flex-col items-start justify-between min-w-[60%] p-8 bg-olive-950 rounded border-2 border-olive-940 select-none">
      <div className="flex flex-row items-center justify-between w-full">
        <Toggle types={props.types} type={props.type} setType={props.setType} />
        <Duration active={props.duration} setActive={props.setDuration} />
      </div>
      <ChartView
        data={props.types[props.type].data[props.duration]}
        labels={props.labels[props.duration]}
        duration={props.duration}
        negative={props.types[props.type].negative}
      />
      {props.children}
    </div>
  );
}

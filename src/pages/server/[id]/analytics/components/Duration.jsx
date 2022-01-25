export default function Duration(props) {
  const durations = [1, 7, 15, 30];

  return (
    <div className="flex flex-row items-center justify-start">
      {durations.map((d, i) => (
        <Time
          key={i}
          duration={d}
          active={props.active}
          setActive={props.setActive}
        />
      ))}
    </div>
  );
}

function Time(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center px-3 ${
        props.active === props.duration ? "bg-olive-920" : "bg-olive-940"
      } cursor-pointer select-none`}
      onClick={(e) => props.setActive(props.duration)}
    >
      <p className="text-lg text-white text-opacity-70">{props.duration}d</p>
    </div>
  );
}

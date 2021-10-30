import Tags from "./Tags";
import Favicon from "./Favicon";

export default function Identity(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <div className="flex flex-row items-center justify-start space-x-4">
        <Favicon name={props.name} favicon={props.favicon} />
        <h1 className="font-medium text-[42px] text-white text-opacity-90">{props.name}</h1>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h4 className="text-[20px] text-white text-opacity-70 max-w-2xl leading-tight">
          {props.description}
        </h4>
      </div>
      <Tags tags={props.tags} />
    </div>
  );
}

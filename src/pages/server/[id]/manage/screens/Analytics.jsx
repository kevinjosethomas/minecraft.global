import Premium from "../components/Premium";
import Instructions from "../components/Instructions";

export default function Analytics(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      {props.server.premium ? <Instructions server={props.server} /> : <Premium />}
    </div>
  );
}

import Home from "./components/Home";
import Vote from "./components/Vote";
import Info from "./components/Info";

export default function Information(props) {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border-2 border-olive-940 bg-olive-950 p-6">
      <div className="flex flex-col space-y-6 text-white text-opacity-80 md:text-xl">
        <Info screens={props.screens} setScreen={props.setScreen} />
        <Vote price={props.prices.vote_page} />
        <Home price={props.prices.home_page} />
      </div>
    </div>
  );
}

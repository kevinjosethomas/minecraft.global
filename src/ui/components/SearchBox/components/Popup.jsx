import Search from "./Search";

export default function Popup(props) {
  return (
    <div className="absolute top-[85px] left-0 flex flex-col items-start justify-start w-full p-6 rounded-[12px] bg-olive-940 bg-opacity-50 border-2 border-olive-940">
      <Search results={props.results} />
    </div>
  );
}

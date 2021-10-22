import Searchbar from "./components/Searchbar";

export default function SearchBox(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <Header />
      <Searchbar />
    </div>
  );
}

function Header() {
  return (
    <h1 className="font-bold text-[56px] text-white text-opacity-90">
      The y=12 for Minecraft Servers
    </h1>
  );
}

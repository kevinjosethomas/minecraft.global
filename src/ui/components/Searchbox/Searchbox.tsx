import Search from "./components/Search";

const Searchbox = (): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-between w-full p-20 bg-dark-800 border-2 border-gray-800 rounded">
      <div className="flex flex-col items-start justify-center space-y-4">
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold text-[4rem] text-gray-300">
            The y=12 for <br />
            Minecraft Servers
          </span>
          <span className="font-medium text-xl text-gray-400">
            Tired of looking for a good Minecraft server?
            <br /> Find the perfect Minecraft Server for you
            <br /> and your friends, right now!{" "}
          </span>
        </div>
        <Search />
      </div>
      <img src="/images/mobs/wither.png" className="w-[32rem]" alt="Wither" />
    </div>
  );
};

export default Searchbox;

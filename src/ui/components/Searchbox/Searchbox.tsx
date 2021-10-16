import Search from "./components/Search";
import { useEffect, useState } from "react";

const Searchbox = (): JSX.Element => {
  const [mob, setMob] = useState("");

  useEffect(() => {
    const mobs = [
      "/images/mobs/drowned.png",
      "/images/mobs/phantom.png",
      "/images/mobs/wither.png",
    ];
    setMob(mobs[Math.floor(Math.random() * mobs.length)]);
  }, []);

  return (
    <div className="flex flex-row items-center justify-between w-full p-6 md:px-20 lg:py-10 xl:py-0 bg-dark-800 border-2 border-gray-800 rounded overflow-hidden">
      <div className="flex flex-col items-start justify-center w-full space-y-4">
        <div className="flex flex-col items-start justify-center w-full space-y-2">
          <h1 className="max-w-xl font-bold text-3xl lg:text-5xl xl:text-6xl text-gray-300">
            The y=12 for Minecraft Servers
          </h1>
          <h2 className="max-w-[26rem] font-medium lg:text-lg xl:text-xl text-gray-400">
            Tired of looking for a good Minecraft server? Find the perfect Minecraft Server for you
            and your friends, right now!
          </h2>
        </div>
        <Search />
      </div>
      <img src={mob} className="hidden md:inline w-[24rem] 2xl:w-[32rem]" alt="Wither" />
    </div>
  );
};

export default Searchbox;

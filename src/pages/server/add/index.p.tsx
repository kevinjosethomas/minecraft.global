import { useState } from "react";

import Details from "./screens/Details";
import Default from "ui/layouts/Default";
import Features from "./screens/Features";
import Votifier from "./screens/Votifier";
import Description from "./screens/Description";
import Navigation from "./components/Navigation";

type AddServerProps = {};

function AddServer(props: AddServerProps): JSX.Element {
  const screens = [
    {
      id: 1,
      name: "Server Details",
      screen: Details,
    },
    {
      id: 2,
      name: "Server Features",
      screen: Features,
    },
    {
      id: 3,
      name: "Server Description",
      screen: Description,
    },
    {
      id: 4,
      name: "Server Votifier",
      screen: Votifier,
    },
  ];

  const [activeScreen, setActiveScreen] = useState(screens[0]);
  const [params, setParams] = useState({
    name: "",
    hostname: "",
    port: "25565",
    description: "",
    whitelisted: false,
    bedrock: false,
    cracked: false,
    website_url: "",
    discord_url: "",
    trailer_url: "",
  });

  const decrementScreen = () => {
    setActiveScreen(screens.find((screen) => screen.id === activeScreen.id - 1) as any);
  };
  const incrementScreen = () => {
    setActiveScreen(screens.find((screen) => screen.id === activeScreen.id + 1) as any);
  };

  return (
    <Default background="bg-dark-700">
      <div className="flex flex-row items-start justify-center space-x-10 w-full">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        <div className="flex flex-col items-start justify-center space-y-8 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-bold text-5xl text-gray-300">{activeScreen.name}</span>
            <div className="flex flex-row items-center justify-center space-x-4">
              {activeScreen.id !== 1 && (
                <div
                  className="flex flex-row items-center justify-center px-2.5 space-x-2 bg-dark-300 hover:bg-dark-100 rounded select-none cursor-pointer transition duration-300"
                  onClick={decrementScreen}
                >
                  <i className="fas fa-long-arrow-alt-left md:text-lg text-gray-400" />
                  <span className="font-semibold md:text-lg text-gray-400">Back</span>
                </div>
              )}
              {activeScreen.id === 4 ? (
                <div
                  className="flex flex-row items-center justify-center px-2.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
                  onClick={incrementScreen}
                >
                  <span className="font-semibold md:text-lg text-gray-300">Submit</span>
                  <i className="fas fa-map-marker-check md:text-lg text-gray-300" />
                </div>
              ) : (
                <div
                  className="flex flex-row items-center justify-center px-2.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
                  onClick={incrementScreen}
                >
                  <span className="font-semibold md:text-lg text-gray-300">Next</span>
                  <i className="fas fa-long-arrow-alt-right md:text-lg text-gray-300" />
                </div>
              )}
            </div>
          </div>
          <activeScreen.screen params={params} setParams={setParams} />
        </div>
      </div>
    </Default>
  );
}

export default AddServer;

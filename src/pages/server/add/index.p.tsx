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
  });

  return (
    <Default background="bg-dark-700">
      <div className="flex flex-row items-start justify-center space-x-10">
        <Navigation
          screens={screens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
        <div className="flex flex-col items-start justify-center space-y-8">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-bold text-5xl text-gray-300">{activeScreen.name}</span>
            <div className="flex flex-row items-center justify-center"></div>
          </div>
          <activeScreen.screen params={params} setParams={setParams} />
        </div>
      </div>
    </Default>
  );
}

export default AddServer;

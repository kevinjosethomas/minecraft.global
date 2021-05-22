import { useState } from "react";

import Details from "./screens/Details";
import Features from "./screens/Features";
import Progress from "./components/Progress";
import Description from "./screens/Description";
import StandardLayout from "../../../layouts/Standard";

function NewServer(props) {
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
  ];

  const [activeScreen, setActiveScreen] = useState(
    screens.find((screen) => (screen.id = 1))
  );

  const updateActiveScreen = (difference) => {
    setActiveScreen(
      screens.find((screen) => screen.id == activeScreen.id + difference)
    );
  };

  const [details, setDetails] = useState({
    name: null,
    address: null,
    description: null,
    tags: [],
    whitelisted: false,
    bedrock: false,
    website: null,
    discord: null,
    trailer: null,
    long_description: null,
  });

  return (
    <StandardLayout footer={false}>
      <div className="flex flex-col items-start justify-start w-full h-full px-10 lg:px-20 2xl:px-56 py-32 bg-dark-80">
        <div className="flex flex-col items-start justify-center w-full space-y-10">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-5xl text-gray-300">
              {activeScreen.name}
            </h1>
            <div className="flex flex-row items-center justify-center space-x-4 select-none">
              {activeScreen.id != 1 && (
                <div
                  className="flex flex-row items-center justify-center px-3 py-1 space-x-2 bg-dark-60 hover:brightness-125 rounded cursor-pointer filter duration-500"
                  onClick={() => updateActiveScreen(-1)}
                >
                  <i className="fas fa-long-arrow-alt-left text-lg text-gray-400" />
                  <span className="font-semibold text-lg text-gray-400">
                    Back
                  </span>
                </div>
              )}
              {activeScreen.id != 3 && (
                <div
                  className="flex flex-row items-center justify-center px-3 py-1 space-x-2 bg-olive-70 hover:brightness-125 rounded cursor-pointer filter duration-500"
                  onClick={() => updateActiveScreen(1)}
                >
                  <span className="font-semibold text-lg text-gray-300">
                    Next
                  </span>
                  <i className="fas fa-long-arrow-alt-right text-lg text-gray-300" />
                </div>
              )}
              {activeScreen.id == 3 && (
                <div className="flex flex-row items-center justify-center px-3 py-1 space-x-2 bg-olive-70 hover:brightness-125 rounded cursor-pointer filter duration-500">
                  <span className="font-semibold text-lg text-gray-300">
                    Submit
                  </span>
                  <i className="fas fa-map-marker-check text-lg text-gray-300" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-start justify-start space-x-10">
            <Progress details={details} activeScreen={activeScreen} />
            <activeScreen.screen details={details} setDetails={setDetails} />
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

export default NewServer;

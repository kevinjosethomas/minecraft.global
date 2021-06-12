import { useState } from "react";

import Account from "./screens/Account";
import NavItem from "./components/NavItem";
import Connections from "./screens/Connections";

function EditUser(props) {
  const screens = [
    {
      id: 1,
      name: "account",
      label: "Account",
      screen: Account,
    },
    {
      id: 2,
      name: "connections",
      label: "Connections",
      screen: Connections,
    },
  ];

  const [activeScreen, setActiveScreen] = useState(screens[0]);
  const [newValues, setNewValues] = useState({
    name: "",
    description: "",
  });

  return (
    <div
      className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50"
      onClick={() => props.setEditUserModal(false)}
    >
      <div
        className="flex flex-row items-start justify-start bg-dark-70"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start justify-between p-2 space-y-96 bg-dark-80 select-none">
          <div className="flex flex-col items-start justify-center w-full space-y-2">
            <NavItem
              label="Account"
              active={activeScreen.id == screens[0].id}
              onClick={() => setActiveScreen(screens[0])}
            />
            <NavItem
              label="Connections"
              active={activeScreen.id == screens[1].id}
              onClick={() => setActiveScreen(screens[1])}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <NavItem label="Logout" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-200 h-full">
          <div className="flex flex-row items-center justify-between w-full px-6 py-4 bg-dark-80 bg-opacity-70">
            <span className="font-bold text-3xl text-gray-400">
              {activeScreen.label}
            </span>
            <i
              className="fas fa-times-circle text-2xl text-gray-400 hover:text-olive-60 cursor-pointer"
              onClick={() => props.setEditUserModal(false)}
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full h-full p-6 bg-dark-80 bg-opacity-40">
            <activeScreen.screen
              user={props.user}
              newValues={newValues}
              setNewValues={setNewValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;

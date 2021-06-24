import cookie from "js-cookie";
import { useState } from "react";
import Router from "next/router";
import { useToasts } from "react-toast-notifications";

import Account from "./screens/Account";
import NavItem from "./components/NavItem";
import Connections from "./screens/Connections";
import editUser from "../../../../api/user/edit";

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

  const { addToast } = useToasts();
  const [activeScreen, setActiveScreen] = useState(screens[0]);
  const [newValues, setNewValues] = useState({
    name: props.user.name,
    description: props.user.description,
  });
  const defaultValues = {
    name: props.user.name,
    description: props.user.description,
  };

  const saveChanges = async () => {
    if (
      newValues.name != defaultValues.name ||
      newValues.description != defaultValues.description
    ) {
      const token = cookie.get("token", { domain: "minecraft.global" });
      const [response, error] = await editUser(
        props.user.user_id,
        newValues.name,
        newValues.description,
        token
      );
      if (error) {
        if (error?.response?.status == 429) {
          addToast("You've hit a ratelimit, please wait before you continue!", {
            appearance: "error",
          });
        } else {
          addToast("An unknown error occured, please contact support!", {
            appearance: "error",
          });
        }
        return;
      }
      addToast("Successfully edited your profile!", {
        appearance: "success",
      });
    }
    props.setEditUserModal(false);
  };

  return (
    <div
      className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-70"
      onClick={saveChanges}
    >
      <div
        className="flex flex-col md:flex-row items-start justify-start w-11/12 h-4/6 md:w-auto md:h-auto bg-dark-70 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row md:flex-col items-center md:items-start justify-start md:justify-between w-full md:w-auto p-2 md:space-y-96 bg-dark-80 select-none">
          <div className="flex flex-row md:flex-col md:items-start items-center justify-start md:justify-center w-full space-x-2 md:space-x-0 md:space-y-2">
            <NavItem
              label="Account"
              icon="fal fa-user"
              active={activeScreen.id == screens[0].id}
              onClick={() => setActiveScreen(screens[0])}
            />
            <NavItem
              label="Connections"
              icon="fal fa-link"
              active={activeScreen.id == screens[1].id}
              onClick={() => setActiveScreen(screens[1])}
            />
            <span className="md:hidden font-medium text-2xl text-gray-300">
              {activeScreen.label}
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center w-full">
            <NavItem
              label="Logout"
              onClick={() => cookie.remove("token") && Router.reload()}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start md:w-200 w-full h-full">
          <div className="hidden md:flex flex-row items-center justify-between w-full px-6 py-4 bg-dark-80 bg-opacity-70">
            <span className="font-bold text-3xl text-gray-400">
              {activeScreen.label}
            </span>
            <i
              className="fas fa-times-circle text-2xl text-gray-400 hover:text-olive-60 cursor-pointer"
              onClick={saveChanges}
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full h-full p-4 md:p-6 bg-dark-80 bg-opacity-40">
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

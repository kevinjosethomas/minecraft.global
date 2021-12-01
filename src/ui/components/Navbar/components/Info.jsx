import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Dropdown from "./Dropdown";

export default function Info(props) {
  const [dropdown, showDropdown] = useState(false);

  const avatar = props.user.minecraft_uuid
  ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128`
  : null

  console.log(props.user);

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="relative flex flex-row items-center justify-center">
        {
          avatar ? (
            <img
              draggable="false"
              src={avatar}
              alt={`${props.user.name}'s skinhead`}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => showDropdown((dd) => !dd)}
            />
          ) : (
            <i
              className="fas fa-user-circle text-4xl text-white text-opacity-80 cursor-pointer"
              onClick={() => showDropdown((dd) => !dd)}
            />
          )
        }
        <AnimatePresence>
          {dropdown && (
            <Dropdown id={props.user.user_id} name={props.user.name} showDropdown={showDropdown} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

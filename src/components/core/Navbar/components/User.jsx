import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Dropdown from "./Dropdown";

function User(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div
      className="relative flex flex-row items-center justify-center px-6 py-2 space-x-2 bg-olive-70 rounded-md cursor-pointer select-none"
      onClick={() => showDropdown(!dropdown)}
    >
      <span className="font-medium text-xs lg:text-sm xl:text-lg text-gray-300">
        {props.username || props.name}
      </span>
      <i className="fas fa-caret-down text-xs lg:text-sm xl:text-lg text-gray-300" />
      <AnimatePresence>
        {dropdown && <Dropdown id={props.id} />}
      </AnimatePresence>
    </div>
  );
}

export default User;

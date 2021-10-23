import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Dropdown from "./Dropdown";

export default function Info(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="relative flex flex-row items-center justify-center">
        <i
          className="fas fa-user-circle text-[40px] text-white text-opacity-80 cursor-pointer"
          onClick={() => showDropdown((dd) => !dd)}
        />
        <AnimatePresence>
          {dropdown && (
            <Dropdown id={props.user.user_id} name={props.user.name} showDropdown={showDropdown} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

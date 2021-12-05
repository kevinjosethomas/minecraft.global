import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import Dropdown from "./Dropdown";

export default function Info(props) {
  const controls = useAnimation();
  const [dropdown, showDropdown] = useState(false);

  const avatar = props.user.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128`
    : "/images/steve.png";

  useEffect(() => {
    if (!dropdown) {
      controls.start({ rotate: 0 });
    } else {
      controls.start({
        rotate: 180,
      });
    }
  }, [dropdown]);

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="relative flex flex-row items-center justify-center">
        <div
          className="flex flex-row items-center justify-center px-3 py-2 space-x-3 bg-olive-940 rounded cursor-pointer"
          onClick={() => showDropdown((dd) => !dd)}
        >
          <img
            draggable="false"
            src={avatar}
            alt={`${props.user.name}'s skinhead`}
            className="w-10 h-10 rounded-sm"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-white select-none leading-tight">{props.user.name}</p>
            <p className="text-xs text-white text-opacity-60 leading-tight">View Menu</p>
          </div>
          <motion.i
            animate={controls}
            className="far fa-angle-down !ml-5 text-xl text-white text-opacity-60"
            transition={{ duration: 0.3 }}
          />
        </div>
        <AnimatePresence>
          {dropdown && (
            <Dropdown id={props.user.user_id} name={props.user.name} showDropdown={showDropdown} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

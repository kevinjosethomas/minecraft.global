import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import Dropdown from "./Dropdown";

export default function Info(props) {
  const controls = useAnimation();
  const [dropdown, showDropdown] = useState(false);

  const avatar = props.user.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128&overlay`
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
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div
          className="flex cursor-pointer items-center justify-center space-x-3 rounded bg-olive-940 px-3 py-2"
          onClick={() => showDropdown((dd) => !dd)}
        >
          <img
            draggable="false"
            src={avatar}
            alt={`${props.user.name}'s skinhead`}
            className="h-10 w-10 rounded-sm"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="select-none text-lg leading-tight text-white">
              {props.user.name}
            </p>
            <p className="text-xs leading-tight text-white text-opacity-60">
              View Menu
            </p>
          </div>
          <motion.i
            animate={controls}
            className="far fa-angle-down !ml-5 text-xl text-white text-opacity-60"
            transition={{ duration: 0.3 }}
          />
        </div>
        <AnimatePresence>
          {dropdown && (
            <Dropdown
              id={props.user.user_id}
              name={props.user.name}
              showDropdown={showDropdown}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

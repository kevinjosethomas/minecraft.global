import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import Dropdown from "./Dropdown";

export default function Identity(props) {
  const controls = useAnimation();
  const [dropdown, showDropdown] = useState(false);

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
        <Info
          animation={controls}
          name={props.user.name}
          uuid={props.user.minecraft_uuid}
          showDropdown={showDropdown}
        />
        <AnimatePresence>
          {dropdown && (
            <Dropdown
              id={props.user.user_id}
              name={props.user.name}
              showDropdown={showDropdown}
              links={props.links}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Info(props) {
  // const avatar = props.uuid
  //   // ? `https://crafatar.com/avatars/${props.uuid}?size=128&overlay`
  //   : "/images/icons/steve-head.png";

  const avatar = "/images/icons/steve-head.png";

  return (
    <div className="flex items-center space-x-6">
      <Link href="/notifications">
        <a>
          <i className="fas fa-bell text-2xl text-white text-opacity-80 transition duration-300 hover:text-opacity-100" />
        </a>
      </Link>
      <div
        className="flex cursor-pointer items-center justify-center space-x-8 rounded-lg bg-olive-900 px-4 py-3 transition duration-300 hover:bg-olive-910"
        onClick={() => props.showDropdown((dd) => !dd)}
      >
        <div className="flex flex-row items-center justify-start space-x-3">
          <Avatar avatar={avatar} name={props.name} />
          <div className="flex flex-col items-start justify-start">
            <p className="select-none text-lg leading-tight text-white">
              {props.name}
            </p>
            <p className="text-xs leading-tight text-white text-opacity-60">
              View Menu
            </p>
          </div>
        </div>
        <motion.i
          animate={props.animation}
          className="far fa-angle-down text-xl text-white text-opacity-60"
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function Avatar({ avatar, name }) {
  return (
    <img
      src={avatar}
      draggable="false"
      alt={`${name}'s skinhead`}
      className="h-10 w-10 rounded-sm"
    />
  );
}

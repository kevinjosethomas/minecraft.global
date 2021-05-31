import Link from "next/link";
import cookie from "js-cookie";
import { motion } from "framer-motion";

import { DropdownAnimation } from "../../../../assets/animations/core";

function Dropdown(props) {
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-start w-full right-0 top-12 py-2 bg-dark-70 rounded cursor-default overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={DropdownAnimation}
      onClick={(e) => e.stopPropagation()}
    >
      <Link href={`/user/${props.id}`}>
        <a className="flex flex-row items-center justify-start w-full px-5 py-2 space-x-2 hover:bg-dark-60">
          <i className="fas fa-eye w-5 text-lg text-gray-400" />
          <span className="font-medium text-lg text-gray-400">
            View Profile
          </span>
        </a>
      </Link>
      <Link href={`/user/${props.id}/edit`}>
        <a className="flex flex-row items-center justify-start w-full px-5 py-2 space-x-2 hover:bg-dark-60">
          <i className="fas fa-pencil-paintbrush w-5 text-lg text-gray-400" />
          <span className="font-medium text-lg text-gray-400">
            Edit Profile
          </span>
        </a>
      </Link>
      <a
        className="flex flex-row items-center justify-start w-full px-5 py-2 space-x-2 hover:bg-dark-60"
        onClick={() => cookie.remove("token")}
      >
        <i className="fas fa-sign-out w-5 text-lg text-gray-400" />
        <span className="font-medium text-lg text-gray-400">Log Out</span>
      </a>
    </motion.div>
  );
}

export default Dropdown;

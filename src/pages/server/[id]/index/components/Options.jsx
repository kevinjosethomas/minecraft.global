import { useState } from "react";
import { useRouter } from "next/router";
import OnOutsideClick from "react-outclick";
import { motion, AnimatePresence } from "framer-motion";

export default function Options(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="relative flex flex-col items-start justify-center">
      <div
        className="flex h-[32px] w-[32px] cursor-pointer flex-col items-center justify-center rounded transition duration-300 hover:bg-white hover:bg-opacity-10 md:h-[40px] md:w-[40px]"
        onClick={() => showDropdown((dd) => !dd)}
      >
        <i className="far fa-ellipsis-h text-2xl text-white text-opacity-80 md:text-3xl" />
      </div>
      <AnimatePresence>
        {dropdown && (
          <Dropdown
            user={props.user}
            server={props.server}
            showDropdown={showDropdown}
            showReportModal={props.showReportModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Dropdown(props) {
  const router = useRouter();

  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-[38px] right-0 flex flex-col items-center justify-start rounded border-2 border-olive-930 bg-olive-950 md:top-[42px]"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.server.owner_id === props.user?.user_id && (
          <DropdownItem
            label="Manage Server"
            onClick={() =>
              router.push(`/server/${props.server.server_id}/manage`)
            }
          />
        )}
        <DropdownItem
          label="Report Server"
          onClick={() => props.showReportModal(true)}
        />
      </motion.div>
    </OnOutsideClick>
  );
}

function DropdownItem(props) {
  return (
    <div
      className="flex cursor-pointer flex-row items-center justify-start py-1.5 pl-2 pr-10 transition duration-300 hover:bg-white hover:bg-opacity-[0.03]"
      onClick={props.onClick}
    >
      <p className="select-none whitespace-nowrap text-lg text-white text-opacity-80 md:text-xl">
        {props.label}
      </p>
    </div>
  );
}

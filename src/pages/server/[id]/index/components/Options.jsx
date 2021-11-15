import { useState } from "react";
import OnOutsideClick from "react-outclick";
import { motion, AnimatePresence } from "framer-motion";

export default function Options(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="relative flex flex-col items-start justify-center">
      <div
        className="flex flex-col items-center justify-center w-[40px] h-[40px] hover:bg-white hover:bg-opacity-10 transition duration-300 rounded cursor-pointer"
        onClick={() => showDropdown((dd) => !dd)}
      >
        <i className="far fa-ellipsis-h text-[32px] text-white text-opacity-80" />
      </div>
      <AnimatePresence>
        {dropdown && (
          <Dropdown showDropdown={showDropdown} showReportModal={props.showReportModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Dropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-[42px] right-0 flex flex-col items-center justify-start bg-olive-950 rounded border-2 border-olive-930"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DropdownItem label="Report Server" onClick={() => props.showReportModal(true)} />
      </motion.div>
    </OnOutsideClick>
  );
}

function DropdownItem(props) {
  return (
    <div
      className="flex flex-row items-center justify-start pl-2 pr-10 py-1.5 hover:bg-white hover:bg-opacity-[0.03] cursor-pointer transition duration-300"
      onClick={props.onClick}
    >
      <span className="text-xl text-white text-opacity-80 whitespace-nowrap select-none">
        {props.label}
      </span>
    </div>
  );
}

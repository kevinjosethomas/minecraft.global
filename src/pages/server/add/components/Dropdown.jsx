import { useState } from "react";
import OnOutsideClick from "react-outclick";
import { AnimatePresence, motion } from "framer-motion";

export default function Dropdown(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="flex flex-row items-start justify-between w-full space-x-8">
      <div className="flex flex-col items-start justify-start !ml-0">
        <p className="text-2xl text-white text-opacity-80">
          {props.label}
          {props.required && <span className="ml-1 text-xl text-red-800 select-none">*</span>}
        </p>
        <p className="text-lg text-white text-opacity-60 leading-tight">{props.description}</p>
      </div>
      <div
        className="relative flex flex-row items-center justify-between w-[450px] h-[60px] px-4 cursor-pointer bg-white bg-opacity-5 border-2 border-white border-opacity-10 rounded-md"
        onClick={() => showDropdown((d) => !d)}
      >
        <p className="text-lg text-white text-opacity-80 select-none">{props.value.label}</p>
        <AnimatePresence>
          {dropdown && (
            <DropdownElement
              value={props.value}
              options={props.options}
              setValue={props.setValue}
              showDropdown={showDropdown}
            />
          )}
        </AnimatePresence>
        <i className="fas fa-caret-down text-lg text-white text-opacity-80" />
      </div>
    </div>
  );
}

function DropdownElement(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-[62px] -left-0.5 flex flex-col items-start justify-start w-[450px] py-1 bg-[#1d2c24] border-2 border-white border-opacity-10 rounded-md"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.options.map((option, index) => (
          <div
            key={index}
            className={`flex flex-row items-center justify-start w-full px-4 py-1  ${
              props.value.id === option.id
                ? "bg-black bg-opacity-[0.15]"
                : "cursor-pointer hover:bg-black hover:bg-opacity-[0.15] transition duration-300"
            }`}
            onClick={() => props.setValue(option)}
          >
            <p className="text-lg text-white text-opacity-80 select-none">{option.label}</p>
          </div>
        ))}
      </motion.div>
    </OnOutsideClick>
  );
}

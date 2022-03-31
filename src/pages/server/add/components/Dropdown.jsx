import { useState } from "react";
import OnOutsideClick from "react-outclick";
import { AnimatePresence, motion } from "framer-motion";

export default function Dropdown(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="flex w-full items-start justify-between space-x-8">
      <div className="!ml-0 flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">
          {props.label}
          {props.required && (
            <span className="ml-1 select-none text-xl text-red-800">*</span>
          )}
        </p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          {props.description}
        </p>
      </div>
      <div
        className="relative flex h-[60px] w-[450px] cursor-pointer items-center justify-between rounded-md border-2 border-white border-opacity-20 bg-white bg-opacity-10 px-4"
        onClick={() => showDropdown((d) => !d)}
      >
        <p className="select-none text-lg text-white text-opacity-80">
          {props.value.label}
        </p>
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
        className="bg-blur-xl absolute top-[62px] -left-0.5 flex w-[450px] flex-col items-start justify-start rounded-md border-2 border-white border-opacity-20 bg-white bg-opacity-10 py-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {props.options.map((option, index) => (
          <div
            key={index}
            className={`flex w-full items-center justify-start px-4 py-1  ${
              props.value.id === option.id
                ? "bg-black bg-opacity-10"
                : "cursor-pointer transition duration-300 hover:bg-black hover:bg-opacity-10"
            }`}
            onClick={() => props.setValue(option)}
          >
            <p className="select-none text-lg text-white text-opacity-80">
              {option.label}
            </p>
          </div>
        ))}
      </motion.div>
    </OnOutsideClick>
  );
}

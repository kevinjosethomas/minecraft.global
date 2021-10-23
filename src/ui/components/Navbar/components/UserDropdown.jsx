import Link from "next/link";
import { motion } from "framer-motion";
import OnOutsideClick from "react-outclick";

export default function UserDropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="z-40 absolute top-12 right-0 flex flex-col items-start justify-start space-y-2 bg-olive-960 border-2 border-olive-940 rounded-md overflow-hidden"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Identity name={props.name} />
        <Links id={props.id} />
      </motion.div>
    </OnOutsideClick>
  );
}

function Identity(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full pl-7 pr-10 py-4 bg-olive-980">
      <span className="text-[18px] text-white text-opacity-60 whitespace-nowrap leading-tight">
        Logged in as
      </span>
      <span className="text-[24px] font-medium text-white text-opacity-80 whitespace-nowrap leading-tight">
        {props.name}
      </span>
    </div>
  );
}

function Links(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full py-2 px-3">
      <Link href={`/user/${props.id}`}>
        <a className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded">
          <i className="fas fa-info-circle w-[30px] text-[24px] text-white text-opacity-60" />
          <span className="text-[24px] text-white text-opacity-60 whitespace-nowrap">
            View Profile
          </span>
        </a>
      </Link>
      <div className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded">
        <i className="far fa-pencil-paintbrush w-[30px] text-[24px] text-white text-opacity-60" />
        <span className="text-[24px] text-white text-opacity-60 whitespace-nowrap">
          Edit Profile
        </span>
      </div>
      <div className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded">
        <i className="far fa-sign-out w-[30px] text-[24px] text-white text-opacity-60" />
        <span className="text-[24px] text-white text-opacity-60 whitespace-nowrap">Log Out</span>
      </div>
    </div>
  );
}

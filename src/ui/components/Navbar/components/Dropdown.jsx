import Link from "next/link";
import cookie from "js-cookie";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import OnOutsideClick from "react-outclick";

export default function Dropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="z-40 absolute top-16 right-0 flex flex-col items-start justify-start space-y-2 bg-olive-960 border-2 border-olive-940 rounded-md overflow-hidden"
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
      <p className="text-lg text-white text-opacity-60 whitespace-nowrap leading-tight">
        Logged in as
      </p>
      <p className="text-2xl font-medium text-white text-opacity-80 whitespace-nowrap leading-tight">
        {props.name}
      </p>
    </div>
  );
}

function Links(props) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start justify-start w-full py-2 px-3">
      <Link href={`/user/${props.id}`}>
        <a className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded">
          <i className="fas fa-info-circle w-[30px] text-2xl text-white text-opacity-60" />
          <p className="text-2xl text-white text-opacity-60 whitespace-nowrap">View Profile</p>
        </a>
      </Link>
      <Link href="/server/add">
        <a className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded">
          <i className="fas fa-plus-circle w-[30px] text-2xl text-white text-opacity-60" />
          <p className="text-2xl text-white text-opacity-60 whitespace-nowrap">Add Server</p>
        </a>
      </Link>
      <Link href={`/user/${props.id}/edit`}>
        <a className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded">
          <i className="far fa-pencil-paintbrush w-[30px] text-2xl text-white text-opacity-60" />
          <p className="text-2xl text-white text-opacity-60 whitespace-nowrap">Edit Profile</p>
        </a>
      </Link>
      <div
        className="flex flex-row items-center justify-start w-full py-1 pl-4 pr-14 space-x-2 hover:bg-black hover:bg-opacity-30 select-none cursor-pointer transition duration-300 rounded"
        onClick={() => {
          cookie.remove("token");
          router.reload();
        }}
      >
        <i className="far fa-sign-out w-[30px] text-2xl text-white text-opacity-60" />
        <p className="text-2xl text-white text-opacity-60 whitespace-nowrap">Log Out</p>
      </div>
    </div>
  );
}

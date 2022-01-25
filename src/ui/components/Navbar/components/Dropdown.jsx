import Link from "next/link";
import cookie from "js-cookie";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import OnOutsideClick from "react-outclick";

export default function Dropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-16 right-0 z-40 flex flex-col items-start justify-start space-y-2 overflow-hidden rounded-md border-2 border-olive-940 bg-olive-960"
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
    <div className="flex w-full flex-col items-start justify-start bg-olive-980 py-4 pl-7 pr-10">
      <p className="whitespace-nowrap text-lg leading-tight text-white text-opacity-60">
        Logged in as
      </p>
      <p className="whitespace-nowrap text-2xl font-medium leading-tight text-white text-opacity-80">
        {props.name}
      </p>
    </div>
  );
}

function Links(props) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-start justify-start py-2 px-3">
      <Link href={`/user/${props.id}`}>
        <a className="flex w-full cursor-pointer select-none flex-row items-center justify-start space-x-2 rounded py-1 pl-4 pr-14 transition duration-300 hover:bg-black hover:bg-opacity-30">
          <i className="fas fa-info-circle w-[30px] text-2xl text-white text-opacity-60" />
          <p className="whitespace-nowrap text-2xl text-white text-opacity-60">
            View Profile
          </p>
        </a>
      </Link>
      <Link href="/server/add">
        <a className="flex w-full cursor-pointer select-none flex-row items-center justify-start space-x-2 rounded py-1 pl-4 pr-14 transition duration-300 hover:bg-black hover:bg-opacity-30">
          <i className="fas fa-plus-circle w-[30px] text-2xl text-white text-opacity-60" />
          <p className="whitespace-nowrap text-2xl text-white text-opacity-60">
            Add Server
          </p>
        </a>
      </Link>
      <Link href={`/user/${props.id}/edit`}>
        <a className="flex w-full cursor-pointer select-none flex-row items-center justify-start space-x-2 rounded py-1 pl-4 pr-14 transition duration-300 hover:bg-black hover:bg-opacity-30">
          <i className="far fa-pencil-paintbrush w-[30px] text-2xl text-white text-opacity-60" />
          <p className="whitespace-nowrap text-2xl text-white text-opacity-60">
            Edit Profile
          </p>
        </a>
      </Link>
      <div
        className="flex w-full cursor-pointer select-none flex-row items-center justify-start space-x-2 rounded py-1 pl-4 pr-14 transition duration-300 hover:bg-black hover:bg-opacity-30"
        onClick={() => {
          cookie.remove("token");
          router.reload();
        }}
      >
        <i className="far fa-sign-out w-[30px] text-2xl text-white text-opacity-60" />
        <p className="whitespace-nowrap text-2xl text-white text-opacity-60">
          Log Out
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Header(props) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start md:items-center justify-between w-full p-4 md:p-10 space-y-4 md:space-y-0 bg-olive-940 bg-opacity-75 rounded border-2 border-olive-930"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ReactTooltip
        effect="solid"
        className="!bg-olive-800 !border-2 !border-olive-930 !text-white !text-opacity-90 !rounded-md"
      />
      <div className="flex flex-col md:flex-row items-start justify-start !mt-0 space-y-2 md:space-y-0 md:space-x-5">
        <img
          draggable="false"
          src={props.avatar}
          alt={`${props.name}'s skinhead`}
          className="w-[64px] md:w-[128px] h-[64px] md:h-[128px]"
        />
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-start space-x-3 md:space-x-4">
            <h1 className="text-2xl md:text-4xl text-white text-opacity-90">{props.name}</h1>
            <Badges permissions={props.permissions} servers={props.servers} />
          </div>
          <p className="md:text-xl text-white text-opacity-80 max-w-xl leading-tight">
            {props.description || "This user was too lazy to write a description for themselves :/"}
          </p>
        </div>
      </div>
      <Buttons user_id={props.user_id} user={props.user} />
    </motion.div>
  );
}

function Badges(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-2 md:space-x-3">
      {props.permissions >= 8 && (
        <i className="fad fa-tools text-lg md:text-2xl text-yellow-600" data-tip="Staff" />
      )}
      {props.permissions >= 5 && (
        <i className="fad fa-badge-check text-lg md:text-2xl text-blue-500" data-tip="Partner" />
      )}
      {props.servers.some((server) => server.premium) && (
        <i className="fad fa-diamond text-lg md:text-2xl text-olive-500" data-tip="Premium" />
      )}
    </div>
  );
}

function Buttons(props) {
  return (
    <div className="flex flex-row md:flex-col items-center justify-center w-full md:w-auto space-x-2 md:space-x-0 md:space-y-2">
      {props.user_id === props.user?.user_id && (
        <Link href={`/user/${props.user?.user_id}/edit`}>
          <a className="flex flex-row items-center justify-center w-full px-2 md:px-5 py-2 space-x-2 md:space-x-3 bg-blue-700 bg-opacity-40 rounded md:rounded-lg border-2 border-blue-900 cursor-pointer hover:scale-[1.01] transition duration-300">
            <i className="fad fa-pencil-paintbrush md:text-xl text-white" />
            <span className="md:text-xl text-white text-opacity-90">Edit Profile</span>
          </a>
        </Link>
      )}
      {props.user_id === props.user?.user_id && (
        <Link href="/server/add">
          <a className="flex flex-row items-center justify-center w-full px-2 md:px-5 py-2 space-x-2 md:space-x-3 bg-yellow-700 bg-opacity-50 rounded md:rounded-lg border-2 border-yellow-900 cursor-pointer hover:scale-[1.01] transition duration-300">
            <i className="fad fa-plus-circle md:text-xl text-white" />
            <span className="md:text-xl text-white text-opacity-90">Add server</span>
          </a>
        </Link>
      )}
    </div>
  );
}

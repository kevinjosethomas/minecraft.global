import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Header(props) {
  return (
    <motion.div
      className="flex w-full flex-col items-start justify-between space-y-4 rounded-2xl border-2 border-olive-800 bg-olive-910 p-4 md:flex-row md:items-center md:space-y-0 md:p-10"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ReactTooltip
        effect="solid"
        className="!rounded-md !border-2 !border-olive-930 !bg-olive-800 !text-white !text-opacity-90"
      />
      <div className="!mt-0 flex flex-col items-start justify-start space-y-2 md:flex-row md:space-y-0 md:space-x-5">
        <img
          draggable="false"
          src={props.avatar}
          alt={`${props.name}'s skinhead`}
          className="h-[64px] w-[64px] rounded-lg md:h-[128px] md:w-[128px]"
        />
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center justify-start space-x-3 md:space-x-4">
            <h1 className="text-2xl text-white text-opacity-90 md:text-4xl">
              {props.name}
            </h1>

            <Badges permissions={props.permissions} servers={props.servers} />
          </div>
          <p className="max-w-xl leading-tight text-white text-opacity-80 md:text-xl">
            {props.description ||
              "This user was too lazy to write a description for themselves :/"}
          </p>
        </div>
      </div>
      {props.user_id === props.user?.user_id && (
        <Buttons user_id={props.user_id} user={props.user} />
      )}
    </motion.div>
  );
}

function Badges(props) {
  return (
    <div className="flex items-center justify-start space-x-2 md:space-x-3">
      {props.permissions >= 8 && (
        <i
          className="fad fa-tools text-lg text-yellow-400 md:text-2xl"
          data-tip="Staff"
        />
      )}
      {props.permissions >= 5 && (
        <i
          className="fad fa-badge-check text-lg text-blue-400 md:text-2xl"
          data-tip="Partner"
        />
      )}
      {props.servers.some((server) => server.premium) && (
        <i
          className="fad fa-diamond text-lg text-olive-400 md:text-2xl"
          data-tip="Premium"
        />
      )}
    </div>
  );
}

function Buttons(props) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 md:w-auto md:flex-col md:space-x-0 md:space-y-2">
      <Button
        href={`/user/${props.user?.user_id}/edit`}
        label="Edit Profile"
        icon="fad fa-pencil-paintbrush"
      />
      <Button href="/server/add" label="Add Server" icon="fad fa-plus-circle" />
    </div>
  );
}

function Button(props) {
  return (
    <Link href={props.href}>
      <a className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-olive-600 bg-olive-700 p-2 transition duration-300 hover:bg-olive-600 md:space-x-3 md:rounded-lg md:px-5">
        <i className={`${props.icon} text-white md:text-xl`} />
        <p className="text-white text-opacity-90 md:text-xl">{props.label}</p>
      </a>
    </Link>
  );
}

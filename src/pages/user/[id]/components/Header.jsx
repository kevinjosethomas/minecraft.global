import Link from "next/link";
import { Fragment } from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Header(props) {
  return (
    <Fragment>
      <ReactTooltip
        effect="solid"
        className="!bg-olive-800 !border-2 !border-olive-930 !text-white !text-opacity-90 !rounded-md"
      />
      <div className="flex flex-row items-center justify-between w-full p-10 bg-olive-940 bg-opacity-75 rounded-[8px] border-2 border-olive-930">
        <div className="flex flex-row items-start justify-start space-x-5">
          <img
            src={props.avatar}
            alt={`${props.name}'s skinhead'`}
            className="w-[128px] h-[128px]"
          />
          <div className="flex flex-col items-start justify-start">
            <div className="flex flex-row items-center justify-start space-x-4">
              <h1 className="text-[40px] text-white text-opacity-90">{props.name}</h1>
              <Badges permissions={props.permissions} servers={props.servers} />
            </div>
            <p className="text-[20px] text-white text-opacity-80 max-w-xl leading-tight">
              {props.description ||
                "This user was too lazy to write a description for themselves :/"}
            </p>
          </div>
        </div>
        <Buttons user_id={props.user_id} user={props.user} />
      </div>
    </Fragment>
  );
}

function Badges(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-3">
      {props.permissions >= 8 && (
        <i className="fad fa-tools text-2xl text-yellow-600" data-tip="Staff" />
      )}
      {props.permissions >= 5 && (
        <i className="fad fa-badge-check text-2xl text-blue-500" data-tip="Partner" />
      )}
      {props.servers.some((server) => server.premium) && (
        <i className="fad fa-diamond text-2xl text-olive-500" data-tip="Premium" />
      )}
    </div>
  );
}

function Buttons(props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {props.user_id === props.user?.user_id && (
        <Link href={`/user/${props.user?.user_id}/edit`}>
          <a className="flex flex-row items-center justify-center w-full px-5 py-2 space-x-3 bg-blue-700 bg-opacity-40 rounded-lg border-2 border-blue-900 cursor-pointer hover:scale-[1.01] transition duration-300">
            <i className="fad fa-pencil-paintbrush text-[20px] text-white" />
            <span className="text-[20px] text-white text-opacity-90">Edit Profile</span>
          </a>
        </Link>
      )}
      {props.user_id === props.user?.user_id && (
        <Link href="/server/add">
          <a className="flex flex-row items-center justify-center w-full px-5 py-2 space-x-3 bg-yellow-700 bg-opacity-50 rounded-lg border-2 border-yellow-900 cursor-pointer hover:scale-[1.01] transition duration-300">
            <i className="fad fa-plus-circle text-[20px] text-white" />
            <span className="text-[20px] text-white text-opacity-90">Add server</span>
          </a>
        </Link>
      )}
    </div>
  );
}

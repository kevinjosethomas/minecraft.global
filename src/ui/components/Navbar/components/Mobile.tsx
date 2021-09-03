import Link from "next/link";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

type Mobile = {
  user?: Record<string, any>;
  setMobile: CallableFunction;
  logout: MouseEventHandler;
};

type Column = {
  rows: Record<string, string>[];
};

function Mobile(props: Mobile): JSX.Element {
  return (
    <div
      className="absolute flex md:hidden flex-col items-start justify-center w-screen h-screen z-30 bg-dark-900 bg-opacity-80 overflow-hidden"
      onClick={() => props.setMobile(false)}
    >
      <motion.div
        className={`flex flex-col items-center ${
          props.user ? "justify-between" : "justify-center"
        } w-10/12 h-full bg-dark-700 overflow-x-hidden`}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "-100vw" }}
        animate={{ x: 0, transition: { duration: 0.2 } }}
        exit={{ x: "-100vw", transition: { duration: 0.2 } }}
      >
        <div />
        <div className="flex flex-col items-start justify-center w-full space-y-5 px-5">
          <Column
            rows={[
              { icon: "far fa-sparkles", label: "Discover", href: "/" },
              { icon: "far fa-gem", label: "Premium", href: "/premium" },
              { icon: "fas fa-heartbeat", label: "Auctions", href: "/auctions" },
              { icon: "far fa-random", label: "Random", href: "/random" },
            ]}
          />
          {props.user ? (
            <Column
              rows={[
                {
                  icon: "fas fa-info-circle",
                  label: "View Profile",
                  href: `/user/${props.user.user_id}`,
                },
                { icon: "fas fa-plus-circle", label: "Add Server", href: "/server/add" },
              ]}
            />
          ) : (
            <Column
              rows={[
                {
                  icon: "far fa-sign-in-alt",
                  label: "Login",
                  href: process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL as string,
                },
              ]}
            />
          )}
        </div>
        {props.user && (
          <div className="flex flex-row items-center justify-between self-end w-full p-5 bg-dark-800 border-t-2 border-gray-800">
            <div className="flex flex-col items-start justify-center">
              <span className="font-medium text-sm text-gray-500 leading-snug">Logged in as</span>
              <span className="font-bold text-lg text-gray-400 leading-snug">
                {props.user.name}
              </span>
            </div>
            <div
              className="flex flex-row items-center justify-center w-10 h-10 bg-dark-600 rounded"
              onClick={props.logout}
            >
              <i className="far fa-sign-out-alt text-lg text-gray-400" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Column(props: Column): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center w-full space-y-3 p-5 bg-dark-800 rounded border-2 border-gray-900">
      {props.rows.map((row, index) => (
        <Link key={index} href={row.href}>
          <a className="flex flex-row items-center justify-start w-full px-2 space-x-2 rounded">
            <i className={`${row.icon} w-6 text-lg text-gray-400`} />
            <span className="font-medium text-lg text-gray-400">{row.label}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default Mobile;

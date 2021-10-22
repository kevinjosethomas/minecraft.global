import { Fragment } from "react";

export default function User(props) {
  return (
    <div className="flex flex-row items-center justify-end space-x-[28px]">
      {props.user ? <Fragment /> : <Login />}
    </div>
  );
}

function Login() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL}
      className="group flex flex-row items-center justify-center px-5 py-1.5 bg-olive-700 hover:bg-olive-800 rounded-[10px] transition duration-300"
    >
      <span className="select-none text-[24px] text-white text-opacity-80 group-hover:text-opacity-90 transition duration-300">
        Login
      </span>
    </a>
  );
}

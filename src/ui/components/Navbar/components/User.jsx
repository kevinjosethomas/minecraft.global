import Link from "next/link";
import { Fragment } from "react";

import Info from "./Info";

export default function User(props) {
  return <Fragment>{props.user ? <Info user={props.user} /> : <Login />}</Fragment>;
}

function Login() {
  return (
    <Link href="/login" passHref>
      <a className="group flex flex-row items-center justify-center px-5 py-1.5 bg-olive-700 hover:bg-olive-800 rounded-[10px] transition duration-300">
        <p className="select-none text-2xl text-white text-opacity-80 group-hover:text-opacity-90 transition duration-300">
          Login
        </p>
      </a>
    </Link>
  );
}

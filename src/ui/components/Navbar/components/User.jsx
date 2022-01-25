import Link from "next/link";
import { Fragment } from "react";

import Info from "./Info";

export default function User(props) {
  return (
    <Fragment>{props.user ? <Info user={props.user} /> : <Login />}</Fragment>
  );
}

function Login() {
  return (
    <Link href="/login" passHref>
      <a className="group flex items-center justify-center rounded-[10px] bg-olive-700 px-5 py-1.5 transition duration-300 hover:bg-olive-800">
        <p className="select-none text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90">
          Login
        </p>
      </a>
    </Link>
  );
}

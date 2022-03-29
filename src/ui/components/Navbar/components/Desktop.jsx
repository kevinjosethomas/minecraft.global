import Link from "next/link";

import Identity from "./Identity";
import Navigation from "./Navigation";

export default function Desktop(props) {
  return (
    <div className="hidden w-full items-center justify-between py-[32px] md:flex">
      <Navigation links={props.data.links} icons={props.data.icons} />
      {props.user ? (
        <Identity user={props.user} links={props.data.user} />
      ) : (
        <Login />
      )}
    </div>
  );
}

function Login() {
  return (
    <Link href="/login">
      <a className="group flex justify-center rounded-lg bg-olive-800 px-6 py-2 transition duration-300 hover:bg-olive-900">
        <p className="select-none text-xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90">
          Sign in
        </p>
      </a>
    </Link>
  );
}

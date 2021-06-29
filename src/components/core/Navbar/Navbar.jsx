import Link from "next/link";
import { Fragment, useState } from "react";

import Logo from "./components/Logo";
import User from "./components/User";
import Login from "./components/Login";
import Search from "./components/Search";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

function Navbar(props) {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  return (
    <Fragment>
      {mobileNavbar && <MobileNavbar {...props} setMobileNavbar={setMobileNavbar} />}

      <div
        className={`flex flex-row items-center justify-center md:justify-between w-full px-10 lg:px-20 2xl:px-56 py-5 ${
          props.dark ? "bg-dark-80" : "bg-dark-70"
        }`}
      >
        <div className="hidden md:flex flex-row items-center justify-center space-x-2 lg:space-x-6">
          <Logo />
          <div className="flex flex-row items-center justify-center space-x-2 lg:space-x-4">
            <Link href="/servers">
              <a className="font-medium text-sm lg:text-lg xl:text-xl text-gray-400 hover:text-gray-300 transition duration-500">
                servers
              </a>
            </Link>
            {/* <Link href="/premium">
              <a className="font-medium text-sm lg:text-lg xl:text-xl text-gray-400 hover:text-gray-300 transition duration-500">
                premium
              </a>
            </Link> */}
            <a href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL} target="_blank">
              <i className="fab fa-discord text-sm lg:text-lg xl:text-xl text-gray-400 hover:text-gray-300 transition duration-500" />
            </a>
          </div>
        </div>
        <div className="hidden md:flex flex-row items-center justify-center space-x-2 lg:space-x-6">
          <Search />
          {props.user ? (
            <div className="flex flex-row items-center justify-center space-x-2 lg:space-x-3">
              <Link href="/server/new">
                <a className="flex flex-row items-center justify-center h-12 w-12 bg-olive-70 rounded-md">
                  <i className="far fa-plus text-sm lg:text-lg xl:text-xl text-gray-300" />
                </a>
              </Link>
              <User
                id={props.user.user_id}
                username={props.user.username}
                name={props.user.name}
                setEditUserModal={props.setEditUserModal}
              />
            </div>
          ) : (
            <Login />
          )}
        </div>
        <div className="flex md:hidden flex-row items-center justify-between w-full">
          <Link href="/">
            <a className="flex flex-row items-center justify-center space-x-3">
              <img
                src="/images/logo.svg"
                alt="logo"
                className="w-6 transform hover:rotate-[360deg] duration-1000"
                draggable="false"
              />
              <span className="font-semibold text-xl text-olive-60">
                minecraft<span className="text-olive-50">.</span>global
              </span>
            </a>
          </Link>
          <i
            className="fas fa-bars text-xl text-gray-400 cursor-pointer"
            onClick={() => setMobileNavbar(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;

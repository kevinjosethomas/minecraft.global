import Link from "next/link";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import User from "./components/User";
import Login from "./components/Login";
import Mobile from "./components/Mobile";
import Search from "./components/Search";
import NavElement from "./components/NavElement";

type Navbar = {
  user?: Record<string, any>;
};

const Navbar = (props: Navbar): JSX.Element => {
  const NavElements = [
    {
      id: 1,
      name: "Discover",
      icon: "far fa-sparkles",
      href: "/",
    },
    {
      id: 2,
      name: "Premium",
      icon: "far fa-gem",
      href: "/premium",
    },
    {
      id: 3,
      name: "Auctions",
      icon: "far fa-heartbeat",
      href: "/auctions",
    },
  ];

  const [mobile, setMobile] = useState(false);

  return (
    <Fragment>
      <AnimatePresence>{mobile && <Mobile {...props} setMobile={setMobile} />}</AnimatePresence>
      <motion.div
        className="flex flex-row items-center justify-between w-full h-20 px-5 md:px-20 bg-dark-800"
        layoutId="navbar"
      >
        <div className="flex flex-row items-center justify-start space-x-8">
          <Link href="/" passHref>
            <img
              src="/images/logo.svg"
              className="w-8 hover:rotate-[360deg] transform duration-1000"
              draggable="false"
              alt="Logo"
            />
          </Link>
          <div className="hidden md:flex flex-row items-center justify-start space-x-8">
            {NavElements.map((element) => (
              <NavElement key={element.id} {...element} />
            ))}
            <Link href="/random">
              <a className="flex flex-row items-center justify-center px-3 py-1 space-x-2 bg-olive-800 rounded">
                <i className="far fa-random text-gray-300" />
                <span className="font-medium text-gray-300">Random Server</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-row items-center justify-end space-x-4">
          <Search />
          {props.user ? <User user={props.user} /> : <Login />}
        </div>
        <div
          className="flex md:hidden flex-row items-center justify-center"
          onClick={() => setMobile(true)}
        >
          <i className="far fa-bars text-2xl text-gray-300" />
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Navbar;

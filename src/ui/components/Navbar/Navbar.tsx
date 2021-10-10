import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
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

  const router = useRouter();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobile]);

  const logout = () => {
    cookie.remove("token");
    router.reload();
  };

  return (
    <Fragment>
      <AnimatePresence>
        {mobile && <Mobile {...props} setMobile={setMobile} logout={logout} />}
      </AnimatePresence>
      <motion.div
        className="flex flex-row items-center justify-between w-full h-20 px-5 md:px-20 3xl:px-40 bg-dark-800"
        layoutId="navbar"
      >
        <div className="hidden md:flex flex-row items-center justify-start space-x-4 xl:space-x-8">
          <Link href="/" passHref>
            <img
              src="/images/logo.svg"
              className="w-8 hover:rotate-[360deg] transform duration-1000 delay-500 cursor-pointer"
              draggable="false"
              alt="Logo"
            />
          </Link>
          {NavElements.map((element) => (
            <NavElement key={element.id} {...element} />
          ))}
          <Link href="/random">
            <a className="flex flex-row items-center justify-center px-2 xl:px-3 py-1.5 xl:py-1 space-x-2 bg-olive-800 rounded">
              <i className="far fa-random text-gray-300" />
              <span className="hidden xl:inline font-medium text-gray-300">Random Server</span>
            </a>
          </Link>
        </div>
        <div className="hidden md:flex flex-row items-center justify-end space-x-4">
          <Search />
          {props.user ? <User user={props.user} logout={logout} /> : <Login />}
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

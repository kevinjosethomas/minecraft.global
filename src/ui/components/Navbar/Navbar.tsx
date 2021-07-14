import { motion } from "framer-motion";

import Login from "./components/Login";
import Search from "./components/Search";
import NavElement from "./components/NavElement";

const Navbar = (): JSX.Element => {
  const NavElements = [
    {
      id: 1,
      name: "Discover",
      icon: "far fa-sparkles",
      href: "/",
    },
    {
      id: 2,
      name: "Search",
      icon: "far fa-search",
      href: "/search",
    },
    {
      id: 3,
      name: "Premium",
      icon: "far fa-gem",
      href: "/premium",
    },
  ];

  return (
    <motion.div
      className="flex flex-row items-center justify-between w-full h-20 px-20 bg-dark-800"
      layoutId="navbar"
    >
      <div className="flex flex-row items-center justify-start space-x-8">
        <img
          src="/images/logo.svg"
          className="w-8 hover:rotate-[360deg] transform duration-1000"
          draggable="false"
          alt="Logo"
        />
        {NavElements.map((element) => (
          <NavElement key={element.id} {...element} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-end space-x-4">
        <Search />
        <Login />
      </div>
    </motion.div>
  );
};

export default Navbar;

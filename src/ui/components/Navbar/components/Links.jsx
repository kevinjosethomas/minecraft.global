import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Dropdown from "./Dropdown";

export default function Links(props) {
  const [dropdown, showDropdown] = useState(false);

  const elements = [
    {
      icon: "far fa-stars",
      label: "Discover",
      href: "/",
    },
    {
      icon: "far fa-badge-dollar",
      label: "Advertise",
      href: "/auctions",
    },
  ];

  const socials = [
    {
      icon: "fab fa-discord",
      href: "https://discord.minecraft.global",
    },
    {
      icon: "fab fa-twitter",
      href: "https://twitter.com/mcdotglobal",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-start space-x-[28px]">
      <img src="/logo.svg" className="w-10 h-10" alt="Logo" />
      {elements.map((element, index) => (
        <Element key={index} icon={element.icon} label={element.label} href={element.href} />
      ))}
      <div className="flex flex-row items-center justify-start mt-1 space-x-[12px]">
        {socials.map((social, index) => (
          <Social key={index} icon={social.icon} href={social.href} />
        ))}
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <i
          className={`${
            dropdown ? "far fa-angle-up" : "far fa-angle-down"
          } text-[24px] text-white text-opacity-80 cursor-pointer`}
          onClick={() => showDropdown((dd) => !dd)}
        />
        <AnimatePresence>{dropdown && <Dropdown />}</AnimatePresence>
      </div>
    </div>
  );
}

function Element(props) {
  return (
    <Link href={props.href}>
      <a className="group flex flex-row items-center justify-start space-x-2">
        <i
          className={`${props.icon} text-[24px] text-white text-opacity-80 group-hover:text-opacity-90 transition duration-300`}
        />
        <span className="text-[24px] text-white text-opacity-80 group-hover:text-opacity-90 transition duration-300">
          {props.label}
        </span>
      </a>
    </Link>
  );
}

function Social(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      <i
        className={`${props.icon} text-[20px] text-white text-opacity-80 hover:text-opacity-90 transition duration-300`}
      />
    </a>
  );
}

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import User from "./components/User";
import Links from "./components/Links";
import MobileNavbar from "./components/MobileNavbar";

export default function Navbar(props) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobile]);

  return (
    <div className="flex flex-row items-center justify-center w-full">
      <div className="hidden md:flex flex-row items-center justify-between py-[32px] w-full">
        <Links />
        <User user={props.user} />
      </div>
      <div className="flex md:hidden flex-row items-center justify-between w-full py-6 !mt-0">
        <Link href="/" passHref>
          <div className="flex flex-row items-center justify-start space-x-3">
            <img src="/logo.svg" className="w-8 h-8 cursor-pointer" alt="Logo" />
            <p className="text-2xl text-olive-300 text-opacity-90">minecraft.global</p>
          </div>
        </Link>
        <i
          className="far fa-bars text-2xl text-white text-opacity-80"
          onClick={() => setMobile(true)}
        />
      </div>
      <AnimatePresence>
        {mobile && <MobileNavbar user={props.user} setMobile={setMobile} />}
      </AnimatePresence>
    </div>
  );
}

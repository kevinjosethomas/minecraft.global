import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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
    <div className="flex w-full items-center justify-center">
      <div className="hidden w-full items-center justify-between py-[32px] md:flex">
        <Links />
        <User user={props.user} />
      </div>
      <div className="!mt-0 flex w-full items-center justify-between py-6 md:hidden">
        <Link href="/">
          <a className="flex items-center justify-start space-x-3">
            <img
              src="/logo.svg"
              className="h-8 w-8 cursor-pointer"
              alt="Logo"
            />
            <p className="text-2xl text-olive-300 text-opacity-90">
              minecraft.global
            </p>
          </a>
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

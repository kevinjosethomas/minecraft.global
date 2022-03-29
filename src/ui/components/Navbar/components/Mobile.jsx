import Link from "next/link";
import { Fragment, useState } from "react";
import { AnimatePresence } from "framer-motion";

import MobileNavbar from "./MobileNavbar";

export default function Mobile(props) {
  const [mobile, setMobile] = useState(false);

  return (
    <div className="!mt-0 flex w-full items-center justify-between py-6 md:hidden">
      <Header setMobile={setMobile} />
      <AnimatePresence>
        {mobile && (
          <MobileNavbar
            user={props.user}
            setMobile={setMobile}
            data={props.data}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Header(props) {
  return (
    <Fragment>
      <Link href="/">
        <a className="flex cursor-pointer items-center space-x-3">
          <img src="/logo.svg" className="h-6 w-6" alt="Logo" />
          <p className="text-3xl text-olive-500">minecraft.global</p>
        </a>
      </Link>
      <i
        className="far fa-bars text-2xl text-white text-opacity-80"
        onClick={() => props.setMobile(true)}
      />
    </Fragment>
  );
}

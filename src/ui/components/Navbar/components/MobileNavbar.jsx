import Link from "next/link";
import { motion } from "framer-motion";
import { Fragment, useEffect } from "react";

export default function MobileNavbar(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="absolute top-0 left-0 z-40 !mt-0 flex h-screen w-screen flex-col items-start justify-start bg-black bg-opacity-80"
      onClick={() => props.setMobile(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex h-full w-[85%] flex-col items-center justify-center space-y-4 border-r-2 border-olive-910 bg-olive-920 px-4"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.2 }}
      >
        {props.user ? (
          <LoggedIn data={props.data} user={props.user} />
        ) : (
          <NotLoggedIn data={props.data} />
        )}
      </motion.div>
    </motion.div>
  );
}

function LoggedIn(props) {
  return (
    <Fragment>
      <Identity uuid={props.user.minecraft_uuid} name={props.user.name} />
      <Category links={props.data.mobile} />
      <Category links={props.data.user} />
    </Fragment>
  );
}

function NotLoggedIn(props) {
  const login = [
    { icon: "far fa-sign-in-alt", label: "Login", href: "/login" },
  ];

  return (
    <Fragment>
      <Category links={props.data.mobile} />
      <Category links={login} />
    </Fragment>
  );
}

function Identity(props) {
  const avatar = props.uuid
    ? `https://crafatar.com/avatars/${props.uuid}?size=128&overlay`
    : "/images/icons/steve-head.png";

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-3 overflow-hidden rounded-xl bg-olive-930 p-4">
      <img
        src={avatar}
        alt={`${props.name}'s skinhead`}
        className="w-[72px] rounded-xl"
      />
      <div className="flex flex-col items-start justify-start">
        <p className="text- leading-tight text-white text-opacity-60">
          Logged in as
        </p>
        <p className="text-xl font-medium leading-tight text-white text-opacity-80">
          {props.name}
        </p>
      </div>
    </div>
  );
}

function Category(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-xl bg-olive-930 py-1">
      {props.links.map((link, index) => (
        <Element
          key={index}
          icon={link.icon}
          label={link.label}
          href={link?.href}
          onClick={link?.onClick}
        />
      ))}
    </div>
  );
}

function Element(props) {
  const Container = ({ children }) =>
    props.href ? (
      <Link href={props.href}>{children}</Link>
    ) : (
      <Fragment>{children}</Fragment>
    );

  return (
    <Container>
      <a
        className="flex w-full items-center justify-start space-x-3 px-4 py-2"
        onClick={props.onClick}
      >
        <i
          className={`${props.icon} w-[24px] text-center text-xl text-white text-opacity-60`}
        />
        <p className="text-xl text-white text-opacity-60">{props.label}</p>
      </a>
    </Container>
  );
}

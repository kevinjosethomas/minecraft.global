import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";

export default function MobileNavbar(props) {
  return (
    <motion.div
      className="absolute top-0 left-0 z-40 flex flex-col items-start justify-start !mt-0 w-screen h-screen bg-black bg-opacity-60"
      onClick={() => props.setMobile(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center w-[85%] h-full px-4 space-y-4 bg-olive-960 border-r-2 border-olive-940"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        {props.user && <User user={props.user} />}
        <Default />
        {props.user ? (
          <Fragment>
            <Logged user={props.user} />
            <Logout />
          </Fragment>
        ) : (
          <Login />
        )}
      </motion.div>
    </motion.div>
  );
}

function Default() {
  return (
    <div className="flex flex-col items-start justify-start w-full py-1 bg-olive-980 rounded overflow-hidden border-2 border-olive-940">
      <Element icon="far fa-home-alt" label="Discover" href="/" />
      <Element icon="far fa-search" label="Search" href="/search" />
      <Element icon="far fa-badge-dollar" label="Premium" href="/premium" />
      {/* <Element icon="far fa-stars" label="Advertise" href="/auctions" /> */}
    </div>
  );
}

function User(props) {
  const avatar = props.user.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128&overlay`
    : "/images/steve.png";

  return (
    <div className="flex flex-col items-start justify-start w-full p-4 space-y-3 bg-olive-980 rounded overflow-hidden border-2 border-olive-940">
      <img src={avatar} alt={`${props.user.name}'s skinhead`} className="w-[72px] rounded-sm" />
      <div className="flex flex-col items-start justify-start">
        <p className="text- text-white text-opacity-60 leading-tight">Logged in as</p>
        <p className="font-medium text-xl text-white text-opacity-80 leading-tight">
          {props.user.name}
        </p>
      </div>
    </div>
  );
}

function Logged(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full py-1 bg-olive-980 rounded overflow-hidden border-2 border-olive-940">
      <Element
        icon="far fa-info-circle"
        label="View Profile"
        href={`/user/${props.user.user_id}`}
      />
      <Element icon="far fa-plus-circle" label="Add Server" href="/server/add" />
      <Element
        icon="far fa-pencil-paintbrush"
        label="Edit Profile"
        href={`/user/${props.user.user_id}/edit`}
      />
    </div>
  );
}

function Login() {
  return (
    <div className="flex flex-col items-start justify-start w-full py-1 bg-olive-980 rounded overflow-hidden border-2 border-olive-940">
      <Element icon="far fa-sign-in-alt" label="Login" href="/login" />
    </div>
  );
}

function Logout() {
  return (
    <div className="flex flex-col items-start justify-start w-full py-1 bg-olive-980 rounded overflow-hidden border-2 border-olive-940">
      <Element icon="far fa-sign-out-alt" label="Logout" />
    </div>
  );
}

function Element(props) {
  const Container = (props) =>
    props.href ? (
      <Link href={props.href}>{props.children}</Link>
    ) : (
      <Fragment>{props.children}</Fragment>
    );

  return (
    <Container href={props.href}>
      <a className="flex flex-row items-center justify-start w-full px-4 py-2 space-x-3">
        <i className={`${props.icon} w-[24px] text-center text-xl text-white text-opacity-60`} />
        <p className="text-xl text-white text-opacity-60">{props.label}</p>
      </a>
    </Container>
  );
}

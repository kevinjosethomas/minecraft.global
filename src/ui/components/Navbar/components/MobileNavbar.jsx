import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";

export default function MobileNavbar(props) {
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
    <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-xl bg-olive-930 py-1">
      <Element icon="far fa-home-alt" label="Discover" href="/" />
      <Element icon="far fa-search" label="Search" href="/search" />
      <Element icon="far fa-badge-dollar" label="Advertise" href="/a" />
      {/* <Element icon="far fa-stars" label="Advertise" href="/auctions" /> */}
    </div>
  );
}

function User(props) {
  const avatar = props.user.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128&overlay`
    : "/images/steve.png";

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-3 overflow-hidden rounded-xl bg-olive-930 p-4">
      <img
        src={avatar}
        alt={`${props.user.name}'s skinhead`}
        className="w-[72px] rounded-xl"
      />
      <div className="flex flex-col items-start justify-start">
        <p className="text- leading-tight text-white text-opacity-60">
          Logged in as
        </p>
        <p className="text-xl font-medium leading-tight text-white text-opacity-80">
          {props.user.name}
        </p>
      </div>
    </div>
  );
}

function Logged(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-xl bg-olive-930 py-1">
      <Element
        icon="far fa-info-circle"
        label="View Profile"
        href={`/user/${props.user.user_id}`}
      />
      <Element
        icon="far fa-plus-circle"
        label="Add Server"
        href="/server/add"
      />
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
    <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-xl bg-olive-930 py-1">
      <Element icon="far fa-sign-in-alt" label="Login" href="/login" />
    </div>
  );
}

function Logout() {
  return (
    <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-xl bg-olive-930 py-1">
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
      <a className="flex w-full items-center justify-start space-x-3 px-4 py-2">
        <i
          className={`${props.icon} w-[24px] text-center text-xl text-white text-opacity-60`}
        />
        <p className="text-xl text-white text-opacity-60">{props.label}</p>
      </a>
    </Container>
  );
}

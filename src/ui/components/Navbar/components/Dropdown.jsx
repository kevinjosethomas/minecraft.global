import Link from "next/link";
import cookie from "js-cookie";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import OnOutsideClick from "react-outclick";

export default function Dropdown(props) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="user-dropdown absolute top-16 right-0 z-40 flex flex-col items-start justify-start space-y-4 overflow-hidden rounded-lg border-2 border-olive-920 bg-olive-910 bg-opacity-60 py-4 px-6"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Identity name={props.name} />
        <Links id={props.id} />
      </motion.div>
    </OnOutsideClick>
  );
}

function Identity(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start pr-10">
      <p className="whitespace-nowrap text-lg leading-tight text-white text-opacity-60">
        Logged in as
      </p>
      <p className="whitespace-nowrap text-2xl font-medium leading-tight text-white text-opacity-80">
        {props.name}
      </p>
    </div>
  );
}

function Links(props) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-1">
      <Element
        href={`/user/${props.id}`}
        label="View Profile"
        icon="fas fa-info-circle"
      />
      <Element
        href="/server/add"
        label="Add Server"
        icon="fas fa-plus-circle"
      />
      <Element
        href={`/user/${props.id}/edit`}
        label="Edit Profile"
        icon="far fa-pencil-paintbrush"
      />
      <Element
        label="Log Out"
        icon="far fa-sign-out"
        onClick={() => {
          cookie.remove("token");
          router.reload();
        }}
      />
    </div>
  );
}

function Element(props) {
  const Container = (p) => (
    <Fragment>
      {props.href ? (
        <Link href={props.href}>
          <a className="group flex cursor-pointer select-none items-center justify-start space-x-2">
            {p.children}
          </a>
        </Link>
      ) : (
        <div
          className="group flex cursor-pointer select-none items-center justify-start space-x-2"
          onClick={props.onClick}
        >
          {p.children}
        </div>
      )}
    </Fragment>
  );

  return (
    <Container>
      <i
        className={`${props.icon} w-[30px] text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90`}
      />
      <p className="whitespace-nowrap text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90">
        {props.label}
      </p>
    </Container>
  );
}

import Link from "next/link";
import { AnimateSharedLayout, motion } from "framer-motion";

export default function Navigation(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="flex w-full flex-col items-start justify-start space-y-1 border-2 border-olive-940 bg-olive-950 px-4 py-2 md:flex-row md:items-center md:space-y-0 md:space-x-8 md:border-none md:bg-transparent md:p-0">
        <Link href="/a">
          <a>
            <i className="far fa-angle-left hidden text-2xl text-white text-opacity-80 md:inline" />
          </a>
        </Link>
        <AnimateSharedLayout>
          {props.screens.map((screen, index) => (
            <Screen
              key={index}
              screen={props.screen}
              onClick={() => props.setScreen(screen)}
              {...screen}
            />
          ))}
        </AnimateSharedLayout>
      </div>
      <div className="hidden h-1 w-full bg-white bg-opacity-10 md:inline" />
    </div>
  );
}

function Screen(props) {
  const active = props.screen.name === props.name;

  return (
    <div
      className="relative flex cursor-pointer select-none items-center justify-center space-x-2 md:px-2"
      onClick={props.onClick}
    >
      <i
        className={`${
          props.icon
        } w-[30px] text-center text-2xl text-white md:w-auto ${
          active ? "text-opacity-90" : "text-opacity-80"
        }`}
      />
      <p
        className={`text-2xl text-white ${
          active ? "text-opacity-90" : "text-opacity-80"
        }`}
      >
        {props.label}
      </p>
      {active && (
        <motion.div
          layoutId="highlight-underline"
          className="absolute -bottom-3 hidden h-1 w-full bg-olive-600 md:inline"
        />
      )}
    </div>
  );
}

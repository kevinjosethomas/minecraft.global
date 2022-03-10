import Link from "next/link";
import { AnimateSharedLayout, motion } from "framer-motion";

export default function Navigation(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="flex w-full items-center justify-start space-x-8">
        <Link href="/a">
          <a>
            <i className="far fa-angle-left text-2xl text-white text-opacity-80" />
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
      <div className="h-1 w-full bg-white bg-opacity-10" />
    </div>
  );
}

function Screen(props) {
  const active = props.screen.name === props.name;

  return (
    <div
      className="relative flex cursor-pointer select-none items-center justify-center space-x-2 px-2"
      onClick={props.onClick}
    >
      <i
        className={`${props.icon} text-2xl text-white ${
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
          className="absolute -bottom-3 h-1 w-full bg-olive-600"
        />
      )}
    </div>
  );
}

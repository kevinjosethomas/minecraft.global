import { AnimateSharedLayout, motion } from "framer-motion";

export default function Navigation(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-start justify-start w-full space-x-8">
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
      className="relative flex flex-row items-center justify-center px-2 space-x-2 cursor-pointer select-none"
      onClick={props.onClick}
    >
      <i
        className={`${props.icon} text-2xl text-white ${
          active ? "text-opacity-90" : "text-opacity-80"
        }`}
      />
      <p className={`text-2xl text-white ${active ? "text-opacity-90" : "text-opacity-80"}`}>
        {props.label}
      </p>
      {active && (
        <motion.div
          layoutId="highlight-underline"
          className="absolute -bottom-3 w-full h-1 bg-olive-600"
        />
      )}
    </div>
  );
}

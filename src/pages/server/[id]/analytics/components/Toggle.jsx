import { AnimateSharedLayout, motion } from "framer-motion";

export default function Toggle(props) {
  return (
    <AnimateSharedLayout>
      <div className="flex flex-row items-center justify-start space-x-4">
        {props.types.map((t, i) => (
          <Type key={i} i={i} t={t.name} type={props.type} setType={props.setType} />
        ))}
      </div>
    </AnimateSharedLayout>
  );
}

function Type(props) {
  const active = props.type === props.i;

  return (
    <div className="relative flex flex-col items-center justify-start px-0.5">
      <p
        className={`text-xl text-white text-white ${
          active
            ? "text-opacity-80"
            : "text-opacity-70 hover:text-opacity-80 transition duration-300"
        } select-none cursor-pointer`}
        onClick={() => props.setType(props.i)}
      >
        {props.t}
      </p>
      {active && (
        <motion.div
          layoutId="underline"
          className="absolute -bottom-1 w-full h-0.5 bg-white bg-opacity-80"
        />
      )}
    </div>
  );
}

export default function Navigation(props) {
  return (
    <div className="flex min-w-[300px] max-w-[300px] flex-col items-start justify-start space-y-4">
      <div className="flex w-full flex-col items-start justify-start space-y-4 rounded-2xl border-2 border-olive-900 bg-olive-920 bg-opacity-90 p-5">
        <div className="flex w-full flex-col items-start justify-start space-y-1.5 px-2">
          {props.screens.map((screen, index) => (
            <div
              key={index}
              className="group flex w-full cursor-pointer items-center justify-start space-x-2.5"
              onClick={() => props.setScreen(screen)}
            >
              <i
                className={`${screen.icon} w-[25px] text-center text-xl ${
                  props.screen.name === screen.name
                    ? "text-olive-300"
                    : "text-white text-opacity-90 transition duration-300 group-hover:text-opacity-100"
                }`}
              />
              <p
                className={`select-none text-xl text-white ${
                  props.screen.name === screen.name
                    ? "text-olive-300"
                    : "text-opacity-90 transition duration-300 group-hover:text-opacity-100"
                }`}
              >
                {screen.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

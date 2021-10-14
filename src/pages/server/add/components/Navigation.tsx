type NavigationProps = {
  screens: Record<string, any>[];
  activeScreen: Record<string, any>;
  setActiveScreen: CallableFunction;
};

function Navigation(props: NavigationProps): JSX.Element {
  return (
    <div className="flex flex-row md:flex-col items-center justify-center space-x-1.5 md:space-x-0 md:space-y-3 select-none">
      {props.screens.map((screen) => (
        <div
          key={screen.id}
          className="flex flex-row md:flex-col items-center justify-center space-x-1.5 md:space-x-0 md:space-y-3"
        >
          <div
            className={`flex flex-col items-center justify-center w-8 md:w-10 h-8 md:h-10 ${
              props.activeScreen.id >= screen.id ? "bg-olive-800" : "bg-dark-300"
            } rounded-full cursor-pointer`}
            onClick={() =>
              props.setActiveScreen(props.screens.find((screen2) => screen2.id == screen.id))
            }
          >
            <span
              className={`font-bold md:text-xl ${
                props.activeScreen.id >= screen.id ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {screen.id}
            </span>
          </div>
          {screen.id != props.screens.length &&
            [1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-2 md:w-3 h-2 md:h-3 ${
                  props.activeScreen.id > screen.id ? "bg-olive-800" : "bg-dark-300"
                } rounded-full`}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Navigation;

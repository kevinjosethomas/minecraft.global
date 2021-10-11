type NavigationProps = {
  screens: Record<string, any>[];
  activeScreen: Record<string, any>;
  setActiveScreen: CallableFunction;
};

function Navigation(props: NavigationProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start w-72 rounded bg-dark-600 border-2 border-gray-800">
      {props.screens.map((screen, index) => (
        <div
          key={screen.id}
          className={`flex flex-row items-center justify-start w-full px-4 py-2 space-x-2 ${
            props.activeScreen.id === screen.id
              ? "bg-dark-700"
              : "hover:bg-dark-700 transition duration-300"
          } select-none cursor-pointer`}
          onClick={() => props.setActiveScreen(props.screens[index])}
        >
          <i className={`${screen.icon} w-8 text-2xl text-gray-400`} />
          <span className="font-medium text-2xl text-gray-400">{screen.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Navigation;

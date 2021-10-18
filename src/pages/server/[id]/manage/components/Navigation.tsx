import Link from "next/link";

type NavigationProps = {
  server: Record<string, any>;
  screens: Record<string, any>[];
  activeScreen: Record<string, any>;
  setActiveScreen: CallableFunction;
};

function Navigation(props: NavigationProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start 4-80 space-y-4">
      <div className="flex flex-col items-start justify-start w-80 rounded bg-dark-700 border-2 border-gray-800">
        {props.screens.map((screen, index) => (
          <div
            key={screen.id}
            className={`flex flex-row items-center justify-start w-full px-4 py-2 space-x-2 ${
              props.activeScreen.id === screen.id
                ? "bg-dark-800"
                : "hover:bg-dark-800 transition duration-300"
            } select-none cursor-pointer`}
            onClick={() => props.setActiveScreen(props.screens[index])}
          >
            <i className={`${screen.icon} w-8 text-2xl text-gray-400`} />
            <span className="font-medium text-2xl text-gray-400">{screen.name}</span>
          </div>
        ))}
      </div>
      <Link href={`/server/${props.server.server_id}`} passHref={true}>
        <a className="flex flex-row items-center justify-center w-full py-6 bg-dark-700 border-2 border-gray-800 hover:bg-dark-800 transition duration-300">
          <span className="font-bold text-2xl text-gray-400">View Server</span>
        </a>
      </Link>
    </div>
  );
}

export default Navigation;

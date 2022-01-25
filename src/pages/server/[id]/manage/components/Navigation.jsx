import Link from "next/link";

export default function Navigation(props) {
  return (
    <div className="flex max-w-[300px] flex-col items-start justify-start space-y-4">
      <Link href={`/server/${props.server.server_id}`}>
        <a className="group flex w-full items-center justify-center space-x-3 rounded-lg border-2 border-olive-930 bg-olive-950 py-2.5 transition duration-300 hover:bg-olive-940">
          <i className="far fa-arrow-left transform text-xl text-white text-opacity-90 duration-300 group-hover:-translate-x-1" />
          <p className="select-none text-xl text-white text-opacity-90">
            View Server
          </p>
        </a>
      </Link>
      <div className="flex w-[300px] flex-col items-start justify-start space-y-4 rounded-lg border-2 border-olive-930 bg-olive-950 p-5">
        <Identity name={props.name} favicon={props.favicon} />
        <div className="flex w-full flex-col items-start justify-start space-y-1.5 px-2">
          {props.screens.map((screen, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer items-center justify-start space-x-2.5"
              onClick={() => props.setScreen(screen)}
            >
              <i
                className={`${screen.icon} w-[25px] text-center text-xl ${
                  props.screen.name === screen.name
                    ? "text-olive-500"
                    : "text-white text-opacity-90"
                }`}
              />
              <p className="select-none text-xl text-white text-opacity-90">
                {screen.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-olive-900 py-3 transition duration-300 hover:bg-olive-800"
        onClick={props.submit}
      >
        <p className="select-none text-xl text-white text-opacity-90">
          Save Changes
        </p>
      </div>
    </div>
  );
}

function Identity(props) {
  return (
    <div className="flex w-full items-center justify-start space-x-2">
      <img
        src={props.favicon}
        alt={`${props.name} Favicon`}
        className="w-10 rounded-full"
      />
      <h3 className="text-2xl text-white">{props.name}</h3>
    </div>
  );
}

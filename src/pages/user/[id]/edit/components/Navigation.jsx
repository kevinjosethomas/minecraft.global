import Link from "next/link";

export default function Navigation(props) {
  return (
    <div className="flex flex-col items-start justify-start max-w-[300px] space-y-4">
      <Link href={`/user/${props.user.user_id}`}>
        <a className="group flex flex-row items-center justify-center w-full py-2.5 space-x-2 bg-olive-950 hover:bg-olive-940 rounded-lg transition duration-300">
          <i className="far fa-arrow-left text-xl text-white text-opacity-90 transform group-hover:-translate-x-1 duration-300" />
          <p className="text-xl text-white text-opacity-90 select-none">View Profile</p>
        </a>
      </Link>
      <div className="flex flex-col items-start justify-start w-[300px] p-5 space-y-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
        {/* <Identity name={props.name} favicon={props.favicon} /> */}
        <div className="flex flex-col items-start justify-start w-full px-2 space-y-1.5">
          {props.screens.map((screen, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-start w-full space-x-2.5 cursor-pointer"
              onClick={() => props.setScreen(screen)}
            >
              <i
                className={`${screen.icon} w-[17.5px] text-center text-xl ${
                  props.screen.name === screen.name
                    ? "text-olive-500"
                    : "text-white text-opacity-90"
                }`}
              />
              <p className="text-xl text-white text-opacity-90 select-none">{screen.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-row items-center justify-center w-full py-2.5 bg-olive-900 hover:bg-olive-800 rounded-lg transition duration-300 cursor-pointer"
        onClick={props.submit}
      >
        <p className="text-xl text-white text-opacity-90 select-none">Save Changes</p>
      </div>
    </div>
  );
}

function Identity(props) {
  return (
    <div className="flex flex-row items-center justify-start w-full space-x-2">
      <img src={props.favicon} alt={`${props.name} Favicon`} className="w-10 rounded-full" />
      <h3 className="text-2xl text-white">{props.name}</h3>
    </div>
  );
}

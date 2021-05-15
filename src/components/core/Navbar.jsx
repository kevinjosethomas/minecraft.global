import Link from "next/link";
import { useRouter } from "next/router";

function Navbar(props) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-row items-center justify-center md:justify-between w-full px-10 lg:px-20 2xl:px-56 py-5 ${
        props.dark ? "bg-dark-80" : "bg-dark-70"
      }`}
    >
      <div className="hidden md:flex flex-row items-center justify-center space-x-2 lg:space-x-6">
        <Link href="/">
          <a className="flex flex-row items-center justify-center space-x-1 lg:space-x-3">
            <img
              src="/images/logo.svg"
              className="w-4 lg:w-6 transform hover:rotate-[360deg] duration-1000"
              draggable="false"
            />
            <h1 className="font-semibold text-md lg:text-xl xl:text-2xl text-olive-60">
              minecraft<span className="text-olive-50">.</span>global
            </h1>
          </a>
        </Link>
        <div className="flex flex-row items-center justify-center space-x-2 lg:space-x-4">
          <Link href="/servers">
            <a className="font-medium text-sm lg:text-lg xl:text-xl text-gray-400 hover:text-gray-300 transition duration-500">
              servers
            </a>
          </Link>
          <Link href="/premium">
            <a className="font-medium text-sm lg:text-lg xl:text-xl text-gray-400 hover:text-gray-300 transition duration-500">
              premium
            </a>
          </Link>
          <a href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL} target="_blank">
            <i className="fab fa-discord text-sm lg:text-lg xl:text-xl text-gray-400 hover:text-gray-300 transition duration-500" />
          </a>
        </div>
      </div>
      <div className="hidden md:flex flex-row items-center justify-center space-x-2 lg:space-x-6">
        <div className="flex flex-row items-center justify-start px-4 py-2 space-x-2 bg-dark-60 rounded-md">
          <i className="far fa-search text-xs lg:text-md xl:text-lg text-gray-400" />
          <input
            className="w-32 lg:w-40 xl:w-56 text-xs lg:text-sm xl:text-md text-gray-400 placeholder-gray-400 bg-transparent focus:outline-none"
            placeholder="Search for servers..."
            onKeyPress={(e) =>
              e.key == "Enter" && e.target.value
                ? router.push("/servers?q=" + e.target.value)
                : void 0
            }
          />
        </div>
        {props.user ? (
          <div className="flex flex-row items-center justify-center px-6 py-2 space-x-2 bg-olive-70 rounded-md cursor-pointer select-none">
            <span className="font-medium text-xs lg:text-sm xl:text-lg text-gray-300">
              {props.user.username || props.user.name}
            </span>
            <i className="fas fa-caret-down text-xs lg:text-sm xl:text-lg text-gray-300" />
          </div>
        ) : (
          <Link href="/login">
            <a className="flex flex-row items-center justify-center px-6 py-2 bg-olive-70 rounded-md">
              <span className="font-medium text-xs lg:text-sm xl:text-lg text-gray-300">
                login / register
              </span>
            </a>
          </Link>
        )}
      </div>
      <div className="flex md:hidden flex-row items-center justify-between w-full">
        <Link href="/">
          <a className="flex flex-row items-center justify-center space-x-3">
            <img
              src="/images/logo.svg"
              className="w-6 transform hover:rotate-[360deg] duration-1000"
              draggable="false"
            />
            <h1 className="font-semibold text-xl text-olive-60">
              minecraft<span className="text-olive-50">.</span>global
            </h1>
          </a>
        </Link>
        <i className="fas fa-bars text-xl text-gray-400" />
      </div>
    </div>
  );
}

export default Navbar;

import Link from "next/link";

function Navbar(props) {
  return (
    <div className="flex flex-row items-center justify-between w-full px-56 py-5 bg-dark-80">
      <div className="flex flex-row items-center justify-center space-x-6">
        <div className="flex flex-row items-center justify-center space-x-3">
          <img
            src="/images/logo.svg"
            className="w-6 transform hover:rotate-[360deg] duration-1000"
            draggable="false"
          />
          <h1 className="font-semibold text-2xl text-olive-60">
            minecraft<span className="text-olive-50">.</span>global
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <Link href="/servers">
            <a className="font-medium text-xl text-gray-400 hover:text-gray-300 transition duration-500">
              servers
            </a>
          </Link>
          <Link href="/premium">
            <a className="font-medium text-xl text-gray-400 hover:text-gray-300 transition duration-500">
              premium
            </a>
          </Link>
          <a href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL} target="_blank">
            <i className="fab fa-discord text-xl text-gray-400 hover:text-gray-300 transition duration-500" />
          </a>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <div className="flex flex-row items-center justify-start px-4 py-2 space-x-2 bg-dark-60 rounded-md">
          <i className="far fa-search text-lg text-gray-400" />
          <input
            className="text-gray-400 placeholder-gray-400 bg-transparent focus:outline-none"
            placeholder="Search for servers..."
          />
        </div>
        <Link href="/login">
          <a className="flex flex-row items-center justify-center px-6 py-2 bg-olive-70 rounded-md">
            <span className="font-medium text-lg text-gray-300">
              login / register
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

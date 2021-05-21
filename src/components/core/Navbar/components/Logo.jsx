import Link from "next/link";

function Logo(props) {
  return (
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
  );
}

export default Logo;

import Link from "next/link";

function Login(props) {
  return (
    <Link href="/login">
      <a className="flex flex-row items-center justify-center px-6 py-2 bg-olive-70 rounded-md">
        <span className="font-medium text-xs lg:text-sm xl:text-lg text-gray-300">
          login / register
        </span>
      </a>
    </Link>
  );
}

export default Login;

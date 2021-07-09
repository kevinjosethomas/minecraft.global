import Link from "next/link";

const Login = (): JSX.Element => {
  return (
    <Link href="/login">
      <a className="group flex flex-row items-center justify-center w-10 h-10 bg-dark-600 rounded">
        <i className="far fa-sign-in-alt text-lg text-gray-400 group-hover:text-gray-300 transition duration-500" />
      </a>
    </Link>
  );
};

export default Login;

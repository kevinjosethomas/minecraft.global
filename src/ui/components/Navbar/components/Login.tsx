const Login = (): JSX.Element => {
  return (
    <a
      href={process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL}
      rel="nofollow noreferrer"
      className="group flex flex-row items-center justify-center px-5 h-10 bg-dark-600 rounded"
    >
      <span className="text-lg text-gray-400">login</span>
      {/* <i className="far fa-sign-in-alt text-lg text-gray-400 group-hover:text-gray-300 transition duration-500" /> */}
    </a>
  );
};

export default Login;

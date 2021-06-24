import Link from "next/link";

import getAuth from "../../api/auth";

function Login(props) {
  return (
    <div className="bg-login flex flex-row items-center justify-start w-full h-full">
      <div className="flex flex-col items-center justify-center h-full px-16 bg-dark-80">
        <div className="flex flex-col items-start justify-center space-y-4">
          <img src="/images/logo.svg" className="w-28" draggable="false" />
          <div className="flex flex-col items-start justify-center space-y-1">
            <h1 className="font-bold text-3xl text-gray-300">
              Join{" "}
              <Link href="/">
                <a className="text-olive-60">
                  minecraft<span className="text-olive-50">.</span>global
                </a>
              </Link>{" "}
              now!
            </h1>
          </div>
          <div className="w-full h-[0.1rem] bg-gray-500" />
          <div className="flex flex-col items-start justify-center w-full space-y-1">
            <span className="font-semibold text-gray-400">
              Sign in or register with
            </span>
            <div className="flex flex-row items-center justify-center w-full space-x-4">
              <a
                href={process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL}
                className="flex flex-row items-center justify-center w-full py-2 bg-dark-70 rounded cursor-pointer text-gray-400 hover:text-gray-300 transition duration-500"
              >
                <i className="fab fa-discord text-xl" />
              </a>
              {/* <a
                href=""
                className="flex flex-row items-center justify-center w-full py-2 bg-dark-70 rounded cursor-pointer text-gray-400 hover:text-gray-300 transition duration-500"
              >
                <i className="fab fa-google text-xl" />
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full bg-dark-90 bg-opacity-50" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const user = await getAuth(ctx.req, ctx.res);

  if (user.payload) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } else {
    return {
      props: {
        user: null,
      },
    };
  }
}

export default Login;

import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";

import LoginWithDiscord from "api/discord";

function Discord(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark-800">
      <img src="/images/loading.gif" alt="Loading" className="w-24" />
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const code = ctx.query.code;
  if (!code) {
    console.log("REDIRECTING; Missing Code");
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const [data, error] = await LoginWithDiscord(code as string);

  if (error) {
    console.log("REDIRECTING; Error");
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const cookies = new Cookies(ctx.req, ctx.res);
  cookies.set("token", data.payload.token, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: 2592000000,
  });

  return {
    redirect: {
      destination: `/?token=${data.payload.token}`,
      permanent: true,
    },
  };
}

export default Discord;

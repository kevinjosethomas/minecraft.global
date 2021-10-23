import Fragment from "react";
import Cookies from "cookies";

import { LoginWithDiscord } from "api/login";

export default function Discord() {
  return <Fragment />;
}

export async function getServerSideProps(ctx) {
  const code = ctx.query.code;

  if (!code) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const [response, error] = await LoginWithDiscord(code);

  if (error) {
    console.log("\n\nError with Discord Login");
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
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    redirect: {
      destination: `/?token=${data.payload.token}`,
      permanent: true,
    },
  };
}

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
        permanent: false,
      },
    };
  }

  const [response, error] = await LoginWithDiscord(code);

  if (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const cookies = new Cookies(ctx.req, ctx.res);
  cookies.set("token", response.payload.token, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return {
    redirect: {
      destination: `/?token=${response.payload.token}`,
      permanent: false,
    },
  };
}

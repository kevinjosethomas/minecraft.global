import Cookies from "cookies";

import getLoginDiscord from "../../api/login/discord";

function Discord(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-dark-80">
      <img src="/images/loading-1.gif" className="w-24" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const code = ctx.query.code;
    if (!code) {
      console.log("MISSING CODE");
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }

    const data = await getLoginDiscord(code);

    const cookies = new Cookies(ctx.req, ctx.res);
    cookies.set("token", data.payload.token, {
      httpOnly: false,
      sameSite: "strict",
    });

    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } catch (e) {
    console.log(e);
    console.log("FAILED LOGIN");
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }
}

export default Discord;

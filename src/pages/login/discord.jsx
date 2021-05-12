import Cookies from "cookies";
import getLoginDiscord from "../../api/login/discord";

function Discord(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-dark-80">
      <img src="/images/loading-1.gif" className="w-24" />
    </div>
  );
}

async function getServerSideProps(ctx) {
  try {
    const code = ctx.query.code;
    if (!code) {
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }

    const data = await getLoginDiscord(code);

    const cookies = new Cookies(ctx.req, ctx.res);
    cookies.set("token", data.payload.token);

    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }
}

export { getServerSideProps };

export default Discord;

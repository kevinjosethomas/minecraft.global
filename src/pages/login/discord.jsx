import getLoginDiscord from "../../api/login/discord";

function Discord(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-dark-80">
      <img src="/images/loading-1.gif" className="w-24" />
    </div>
  );
}

async function getServerSideProps(ctx) {
  const code = ctx.query.code;
  if (!code) {
    console.log("returning here");
    console.log(code);
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const token = await getLoginDiscord(code);
  console.log(token);
}

export { getServerSideProps };

export default Discord;

import Default from "ui/layouts/Default";

export default function Login(props) {
  return (
    <Default user={props.user}>
      <div className="flex flex-col items-center justify-center w-full 2xl:py-12 3xl:py-28 space-y-6">
        <h1 className="font-bold text-[48px] text-white text-opacity-90 leading-tight">
          How would you like to login or sign up?
        </h1>
        <div className="flex flex-row items-center justify-center space-x-6">
          <a className="google-gradient flex flex-row items-center justify-center w-96 h-96 hover:scale-[1.01] border-2 border-olive-950 rounded-[12px] transform duration-300">
            <i className="fab fa-google text-[96px] text-white" />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL}
            className="discord-gradient flex flex-row items-center justify-center w-96 h-96 hover:scale-[1.01] border-2 border-olive-950 rounded-[12px] transform duration-300"
          >
            <i className="fab fa-discord text-[96px] text-white" />
          </a>
        </div>
      </div>
    </Default>
  );
}

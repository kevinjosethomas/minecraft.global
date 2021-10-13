type BannerProps = {
  banner: boolean;
  setBanner: CallableFunction;
};

function Banner(props: BannerProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-between w-full h-20 px-5 md:px-20 3xl:px-40 bg-olive-600">
      <div className="flex flex-row items-center justify-center space-x-2">
        <div className="flex flex-col items-center justify-center w-12 h-12 bg-olive-800 rounded">
          <i className="far fa-bullhorn text-lg text-gray-50" />
        </div>
        <span className="font-medium text-lg text-gray-50">
          This website is currently in BETA! Join our Discord Server to take part in weekly Discord
          Nitro and Minecraft Account giveaways!
        </span>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2">
        <a
          href="https:/discord.minecraft.global/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row items-center justify-center h-12 px-4 bg-gray-50 rounded-lg transform hover:scale-102 duration-300"
        >
          <span className="font-medium text-lg text-olive-600">Join our Discord</span>
        </a>
        <div
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg hover:bg-olive-800 transition duration-300 cursor-pointer"
          onClick={() => {
            props.setBanner(false);
            localStorage.setItem("banner", "false");
          }}
        >
          <i className="far fa-times text-xl text-gray-50" />
        </div>
      </div>
    </div>
  );
}

export default Banner;

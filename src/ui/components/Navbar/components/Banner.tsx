type BannerProps = {
  banner: boolean;
  setBanner: CallableFunction;
};

function Banner(props: BannerProps): JSX.Element {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full md:h-16 xl:h-20 py-4  md:py-0 px-5 md:px-20 3xl:px-40 space-y-2 md:space-y-0 bg-olive-600">
      <div className="flex flex-row items-center justify-center space-x-2">
        <div className="hidden md:flex flex-col items-center justify-center w-10 xl:w-12 h-10 xl:h-12 bg-olive-800 rounded">
          <i className="far fa-bullhorn text-sm xl:text-lg text-gray-50" />
        </div>
        <span className="font-medium text-sm xl:text-lg max-w-xl xl:max-w-none text-gray-50">
          Join our Discord Server to take part in weekly Discord Nitro and Minecraft Account
          giveaways!
        </span>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 w-full md:w-auto">
        <a
          href="https:/discord.minecraft.global/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row items-center justify-center w-full md:w-auto h-10 xl:h-12 px-2 xl:px-4 bg-gray-50 rounded xl:rounded-lg transform hover:scale-102 duration-300"
        >
          <span className="font-medium text-sm xl:text-lg text-olive-600">Join our Discord</span>
        </a>
        <div
          className="flex flex-col items-center justify-center w-10 xl:w-12 h-10 xl:h-12 rounded xl:rounded-lg hover:bg-olive-800 transition duration-300 cursor-pointer"
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

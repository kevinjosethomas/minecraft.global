export default function Disclaimer(props) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Legal />
      <Socials />
    </div>
  );
}

function Legal() {
  return (
    <p className="max-w-[250px] text-lg text-white text-opacity-70 md:max-w-none">
      minecraft.global is not associated with{" "}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href="https://minecraft.net/"
        className="transition duration-300 hover:text-white hover:text-opacity-80"
      >
        Minecraft
      </a>
      ,{" "}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href="https://minecraft.net/"
        className="transition duration-300 hover:text-white hover:text-opacity-80"
      >
        Mojang
      </a>{" "}
      or{" "}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href="https://microsoft.com/"
        className="transition duration-300 hover:text-white hover:text-opacity-80"
      >
        Microsoft
      </a>
    </p>
  );
}

function Socials() {
  return (
    <div className="flex flex-col items-center justify-start md:flex-row md:space-x-4">
      <a
        href="https://discord.minecraft.global"
        target="_blank"
        rel="noreferrer nofollow"
      >
        <i className="fab fa-discord text-lg text-white text-opacity-70 transition duration-300 hover:text-opacity-80" />
      </a>
      <a
        href="https://twitter.com/mcdotglobal"
        target="_blank"
        rel="noreferrer nofollow"
      >
        <i className="fab fa-twitter text-lg text-white text-opacity-70 transition duration-300 hover:text-opacity-80" />
      </a>
      <a
        href="mailto:staff@minecraft.global"
        target="_blank"
        rel="noreferrer nofollow"
      >
        <i className="fas fa-envelope text-lg text-white text-opacity-70 transition duration-300 hover:text-opacity-80" />
      </a>
    </div>
  );
}

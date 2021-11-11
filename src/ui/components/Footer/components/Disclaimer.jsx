export default function Disclaimer(props) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Legal />
      <Socials />
    </div>
  );
}

function Legal() {
  return (
    <p className="text-lg text-white text-opacity-70">
      minecraft.global is not associated with{" "}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href="https://minecraft.net/"
        className="hover:text-white hover:text-opacity-80 transition duration-300"
      >
        Minecraft
      </a>
      ,{" "}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href="https://minecraft.net/"
        className="hover:text-white hover:text-opacity-80 transition duration-300"
      >
        Mojang
      </a>
      ,{" "}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href="https://microsoft.com/"
        className="hover:text-white hover:text-opacity-80 transition duration-300"
      >
        Microsoft
      </a>
    </p>
  );
}

function Socials() {
  return (
    <div className="flex flex-row items-center justify-start space-x-4">
      <a href="https://discord.minecraft.global" target="_blank" rel="noreferrer nofollow">
        <i className="fab fa-discord text-lg text-white text-opacity-70 hover:text-opacity-80 transition duration-300" />
      </a>
      <a href="https://twitter.com/mcdotglobal" target="_blank" rel="noreferrer nofollow">
        <i className="fab fa-twitter text-lg text-white text-opacity-70 hover:text-opacity-80 transition duration-300" />
      </a>
      <a href="mailto:staff@minecraft.global" target="_blank" rel="noreferrer nofollow">
        <i className="fas fa-envelope text-lg text-white text-opacity-70 hover:text-opacity-80 transition duration-300" />
      </a>
    </div>
  );
}

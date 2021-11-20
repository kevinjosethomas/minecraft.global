import Link from "next/link";

import TopTags from "./TopTags";

export default function Sidebar() {
  return (
    <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-8">
      <Discord />
      <TopTags />
    </div>
  );
}

function Discord() {
  return (
    <a
      target="_blank"
      rel="noreferrer nofollow"
      href="https://discord.minecraft.global/"
      className="flex flex-row items-center justify-start w-full px-4 py-2 space-x-3 hover:bg-white hover:bg-opacity-5 rounded transition duration-300"
    >
      <i className="fab fa-discord text-3xl text-olive-600" />
      <p className="text-3xl text-white text-opacity-80">Join our Discord</p>
    </a>
  );
}

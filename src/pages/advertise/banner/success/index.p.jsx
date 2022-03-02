import Link from "next/link";

import Default from "ui/layouts/Default";

export default function Success(props) {
  return (
    <Default title="Purchase Complete - Minecraft Server List">
      <div className="relative flex w-full flex-col">
        <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center space-y-4">
          <p className="max-w-2xl select-none text-center text-6xl font-bold text-white">
            Thanks for purchasing an advertisement!{" "}
            <img
              alt="Heart"
              src="/images/heart.png"
              className="inline w-10"
              draggable="false"
            />
          </p>
          <Link href="/advertise/dashboard">
            <a className="flex select-none items-center justify-center rounded-lg bg-olive-700  px-6 py-3 transition duration-300 hover:bg-olive-800">
              <p className="text-2xl font-medium text-white">
                Visit Advertisement Dashboard
              </p>
            </a>
          </Link>
        </div>
        <img
          src="/images/illustrations/mobs.png"
          alt="Mobs"
          className="opacity-20"
        />
      </div>
    </Default>
  );
}

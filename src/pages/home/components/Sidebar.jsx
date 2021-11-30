import Link from "next/link";

import TopTags from "./TopTags";

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-8">
      {/* <Discord /> */}
      {/* <Advertising /> */}
      <Premium />
      <TopTags />
    </div>
  );
}

// function Discord() {
//   return (
//     <a
//       target="_blank"
//       rel="noreferrer nofollow"
//       href="https://discord.minecraft.global/"
//       className="flex flex-row items-center justify-start w-full px-4 py-2 space-x-3 hover:bg-white hover:bg-opacity-5 rounded transition duration-300"
//     >
//       <i className="fab fa-discord text-3xl text-olive-600" />
//       <p className="text-3xl text-white text-opacity-80">Join our Discord</p>
//     </a>
//   );
// }

function Advertising() {
  return (
    <div className="flex flex-col items-center justify-center w-ful rounded-lg overflow-hidden">
      <div className="flex flex-col items-start justify-start">
        <img src="/images/auctions-embed.png" draggable="false" alt="Auctions Advertising" />
        <div className="flex flex-col items-start justify-start w-full p-5 space-y-4 bg-olive-960">
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <p className="font-medium text-2xl text-white text-opacity-80">
              Grow and advertise your server
            </p>
            <p className="text-lg text-white text-opacity-60 leading-snug">
              Garner thousands of views by bidding in weekly auctions to rent prime advertising
              spots on our website! Get your server on top of the homepage or more niche tag pages
              for specific gamemodes and versions!
            </p>
          </div>
          <Link href="/advertise">
            <a className="flex flex-row items-center justify-center w-full py-2 bg-olive-900 hover:bg-olive-800 rounded transition duration-300 cursor-pointer">
              <p className="font-medium text-2xl text-white text-opacity-80 select-none">
                Visit Auctions
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Premium() {
  return (
    <div className="flex flex-col items-center justify-center w-ful rounded-lg overflow-hidden">
      <div className="flex flex-col items-start justify-start">
        <img src="/images/premium-embed.png" draggable="false" alt="Auctions Advertising" />
        <div className="flex flex-col items-start justify-start w-full p-5 space-y-4 bg-olive-960">
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <p className="font-medium text-2xl text-white text-opacity-80">
              Server Analytics
            </p>
            <p className="text-lg text-white text-opacity-60 leading-snug">
              Subscribe to premium to get in-depth analytics about your server&apos;s players! Gain
              access to other exclusive features to understand and grow your server rapidly!
              Additionally, earn back your subscription investment in Auctions Credit for free!
            </p>
          </div>
          <Link href="/premium">
            <a className="flex flex-row items-center justify-center w-full py-2 bg-olive-900 hover:bg-olive-800 rounded transition duration-300 cursor-pointer">
              <p className="font-medium text-2xl text-white text-opacity-80 select-none">
                Check it out
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

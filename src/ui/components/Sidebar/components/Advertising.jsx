import Link from "next/link";

export default function Advertising() {
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

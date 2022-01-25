import Link from "next/link";

export default function Advertising() {
  return (
    <div className="w-ful flex flex-col items-center justify-center overflow-hidden rounded-lg">
      <div className="flex flex-col items-start justify-start">
        <img
          src="/images/auctions-embed.png"
          draggable="false"
          alt="Auctions Advertising"
        />
        <div className="flex w-full flex-col items-start justify-start space-y-4 bg-olive-960 p-5">
          <div className="flex w-full flex-col items-start justify-start space-y-1">
            <p className="text-2xl font-medium text-white text-opacity-80">
              Grow and advertise your server
            </p>
            <p className="text-lg leading-snug text-white text-opacity-60">
              Garner thousands of views by bidding in weekly auctions to rent
              prime advertising spots on our website! Get your server on top of
              the homepage or more niche tag pages for specific gamemodes and
              versions!
            </p>
          </div>
          <Link href="/advertise">
            <a className="flex w-full cursor-pointer flex-row items-center justify-center rounded bg-olive-900 py-2 transition duration-300 hover:bg-olive-800">
              <p className="select-none text-2xl font-medium text-white text-opacity-80">
                Visit Auctions
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

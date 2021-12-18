import Link from "next/link";

export default function Premium() {
  return (
    <div className="flex flex-col items-center justify-center w-ful rounded-lg overflow-hidden">
      <div className="flex flex-col items-start justify-start">
        <img src="/images/premium-embed.png" draggable="false" alt="Auctions Advertising" />
        <div className="flex flex-col items-start justify-start w-full p-5 space-y-4 bg-olive-960">
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            <p className="font-medium text-2xl text-white text-opacity-80">Grow your server!</p>
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

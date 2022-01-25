import Link from "next/link";

export default function Premium() {
  return (
    <div className="w-ful flex flex-col items-center justify-center overflow-hidden rounded-lg">
      <div className="flex flex-col items-start justify-start">
        <img
          src="/images/premium-embed.png"
          draggable="false"
          alt="Auctions Advertising"
        />
        <div className="flex w-full flex-col items-start justify-start space-y-4 bg-olive-960 p-5">
          <div className="flex w-full flex-col items-start justify-start space-y-1">
            <p className="text-2xl font-medium text-white text-opacity-80">
              Grow your server!
            </p>
            <p className="text-lg leading-snug text-white text-opacity-60">
              Subscribe to premium to get in-depth analytics about your
              server&apos;s players! Gain access to other exclusive features to
              understand and grow your server rapidly! Additionally, earn back
              your subscription investment in Auctions Credit for free!
            </p>
          </div>
          <Link href="/premium">
            <a className="flex w-full cursor-pointer flex-row items-center justify-center rounded bg-olive-900 py-2 transition duration-300 hover:bg-olive-800">
              <p className="select-none text-2xl font-medium text-white text-opacity-80">
                Check it out
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

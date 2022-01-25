export default function Credit(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-6 rounded border-2 border-olive-940 bg-olive-950 p-10">
      <h1 className="text-5xl font-medium text-white text-opacity-90">
        Credit
      </h1>
      <div className="flex w-full flex-row items-start justify-start space-x-4">
        <div className="flex min-w-[16rem] select-none flex-col items-start justify-start space-y-1.5 rounded border-2 border-olive-930 bg-olive-940 p-5">
          <p className="text-xl text-white text-opacity-80">You have</p>
          <p className="text-4xl font-medium tracking-wide text-white text-opacity-90">
            ${Math.round(props.user.auction_credit * 100) / 100}
          </p>
          <p className="text-xl text-white text-opacity-80">
            of Advertising Credit
          </p>
        </div>
        <p className="text-lg text-white text-opacity-80">
          You can use this Advertising Credit to buy weekly advertisement spots
          once our Auctions are open! Get $5 of free Advertising Credit every
          month for every server you subscribe to Premium for :)
        </p>
      </div>
    </div>
  );
}

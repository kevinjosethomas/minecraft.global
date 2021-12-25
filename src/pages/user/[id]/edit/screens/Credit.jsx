export default function Credit(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full p-10 space-y-6 bg-olive-950 rounded border-2 border-olive-940">
      <h1 className="font-medium text-5xl text-white text-opacity-90">Credit</h1>
      <div className="flex flex-row items-start justify-start w-full space-x-4">
        <div className="flex flex-col items-start justify-start p-5 min-w-[16rem] space-y-1.5 select-none bg-olive-940 rounded border-2 border-olive-930">
          <p className="text-xl text-white text-opacity-80">You have</p>
          <p className="font-medium tracking-wide text-4xl text-white text-opacity-90">
            ${Math.round(props.user.auction_credit * 100) / 100}
          </p>
          <p className="text-xl text-white text-opacity-80">of Advertising Credit</p>
        </div>
        <p className="text-lg text-white text-opacity-80">
          You can use this Advertising Credit to buy weekly advertisement spots once our Auctions
          are open! Get $5 of free Advertising Credit every month for every server you subscribe to
          Premium for :)
        </p>
      </div>
    </div>
  );
}

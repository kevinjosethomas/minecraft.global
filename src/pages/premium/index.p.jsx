import Card from "./components/Card";
import Default from "ui/layouts/Default";

export default function Premium(props) {
  return (
    <Default>
      <div className="flex flex-row items-center justify-between w-full py-5">
        <div className="flex flex-col items-start justify-start w-[700px] space-y-4">
          <h1 className="font-bold text-[48px] text-white text-opacity-90 max-w-xl leading-tight">
            Everything you need to grow your server. For only{" "}
            <span className="text-olive-400">$4.99</span> a month!
          </h1>
          <div className="flex flex-col items-start justify-center space-y-4">
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fal fa-chart-bar w-[32px] text-teal-500 text-[32px] text-center" />
                <span className="text-[32px] text-teal-500">Server Analytics</span>
              </div>
              <p className="text-[24px] text-white text-opacity-70">
                Premium users get a plugin that regularly transmits data from your Minecraft server
                to our website! This allows you to track various statistics like player count,
                upvote count, memory usage and CPU usage for up to 30 days!
              </p>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fal fa-sack-dollar w-[32px] text-orange-700 text-[32px] text-center" />
                <span className="text-[32px] text-orange-700">Monthly Auction Credit</span>
              </div>
              <p className="text-[24px] text-white text-opacity-70">
                All Premium users get $5 worth of Auctions Credit every month! This credit can be
                used to bid for advertisements in any tag! Credit will only be used if you actually
                win the auction. Auctions Credit also carries over to the following month!
              </p>
            </div>
          </div>
        </div>
        <Card />
      </div>
    </Default>
  );
}

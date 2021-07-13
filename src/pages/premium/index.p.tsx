import Default from "ui/layouts/Default";
import Feature from "./components/Feature";

function Premium(): JSX.Element {
  return (
    <Default background="premium-bg-gradient">
      <div className="premium-bg-gradient flex flex-col items-center justify-center w-full space-y-10">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex flex-row items-center justify-center w-full space-x-2">
            <i className="fad fa-diamond fa-swap-opacity fa-opacity-60 text-3xl text-olive-500" />
            <span className="font-bold text-3xl text-olive-500 tracking-tight">PREMIUM</span>
          </div>
          <span className="font-bold text-5xl text-gray-300">Grow and monetize your server</span>
          <span className="font-bold text-4xl text-gray-300">for the price of a coffee</span>
        </div>
        <div className="flex flex-row  justify-center w-full border-2 border-gray-800 rounded">
          <div className="flex flex-col items-start justify-center w-3/4 p-10 space-y-6 bg-dark-600">
            <div className="flex flex-col items-start justify-center w-full space-y-2">
              <span className="font-bold text-4xl text-gray-300 tracking-tight">
                Monthly Premium
              </span>
              <span className="text-lg text-gray-400 tracking-tight leading-snug">
                Buy premium for a cheap monthly price to quickly grow, advertise and earn from your
                Minecraft Server! Premium fees help us pay to host and advertise this website to
                make it easier for thousands of servers to be found!
              </span>
            </div>
            <div className="flex flex-row items-center justify-start w-full space-x-4">
              <span className="font-bold text-lg text-olive-600">WHAT&apos;S INCLUDED</span>
              <div className="flex-1 h-1 bg-olive-600 rounded" />
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-col items-start justify-center space-y-2">
                <Feature
                  icon="fad fa-diamond fa-swap-opacity fa-opacity-60"
                  name="Premium Badge"
                  color="text-olive-500"
                />
                <Feature
                  icon="fad fa-newspaper fa-opacity-80"
                  name="Featured on Front Page"
                  color="text-teal-600"
                />
                <Feature
                  icon="fad fa-stars fa-opacity-80 fa-swap-opacity"
                  name="Prominent Server Card"
                  color="text-red-700"
                />
              </div>
              <div className="flex flex-col items-start justify-center space-y-2">
                <Feature
                  icon="fad fa-link fa-opacity-80"
                  name="Custom Server URL"
                  color="text-yellow-700"
                />
                <Feature
                  icon="fad fa-analytics fa-opacity-80 fa-swap-opacity"
                  name="Advanced Server Analytics"
                  color="text-indigo-700"
                />
                <Feature
                  icon="fad fa-do-not-enter fa-opacity-60 fa-swap-opacity"
                  name="Reduced Advertisements"
                  color="text-pink-700"
                />
              </div>
              <div className="flex flex-col items-start justify-center space-y-2">
                <Feature
                  icon="fab fa-discord"
                  name="Exclusive Discord Role"
                  color="text-[#5865F2]"
                />
                <Feature
                  icon="fad fa-sign fa-opacity-80 fa-swap-opacity"
                  name="Private Discord Advertising"
                  color="text-orange-700"
                />
                <Feature icon="fad fa-heartbeat" name="Support Us" color="text-red-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/4 p-10 space-y-8 bg-dark-700">
            <div className="flex flex-col items-center justify-center">
              <span className="font-bold text-2xl text-gray-400">USD</span>
              <span className="font-bold text-7xl text-gray-300 tracking-tight">
                $4.99<span className="text-xl text-gray-400 tracking-normal">/mo</span>
              </span>
              <span className="font-medium text-lg text-gray-400 underline">for each server</span>
            </div>
            <div className="flex flex-row items-center justify-center px-12 py-3 space-x-2 bg-gradient-to-r from-[#1D3729] to-[#284D39] rounded cursor-not-allowed hover:scale-[1.02] transform duration-500">
              <i className="fad fa-shopping-cart fa-opacity-80 text-lg text-olive-400" />
              <span className="font-bold text-lg text-gray-300">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
}

export default Premium;

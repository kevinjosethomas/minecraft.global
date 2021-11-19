import { useState } from "react";

import Link from "next/link";

export default function Analytics(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-10">
      <div className="flex flex-row items-center justify-between w-full space-x-8">
        <div className="flex flex-col items-start justify-start space-y-2">
          <p className="max-w-md text-lg text-white text-opacity-90">
            Server Analytics provides you with a Bukkit plugin to add to your server. The plugin
            sends data to our site every hour and we intuitively display various graphs and
            statistics that can help you make data-driven decisions for your server&apos;s growth!
          </p>
          <ul className="list-disc list-inside">
            <li className="text-lg text-white text-opacity-80">
              Player Count Graphs (up to 30 days)
            </li>
            <li className="text-lg text-white text-opacity-80">Most Active Hours (Player Count)</li>
            <li className="text-lg text-white text-opacity-80">
              Upvote Count Graphs (up to 30 days)
            </li>
            <li className="text-lg text-white text-opacity-80">Most Active Hours (Upvote Count)</li>
            <li className="text-lg text-white text-opacity-80">
              Chat Message Count Graphs (up to 30 days)
            </li>
            <li className="text-lg text-white text-opacity-80">
              Impressions and Pageview Graphs (up to 30 days)
            </li>
            <li className="text-lg text-white text-opacity-80">
              Memory and CPU Usage Graphs (up to 30 days)
            </li>
            <li className="text-lg text-white text-opacity-80">
              TPS and World Size Graphs (up to 30 days)
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs px-3 py-12 space-y-6 bg-black bg-opacity-30 rounded-lg">
          <div className="flex flex-row items-center justify-center space-x-2">
            <i className="fad fa-diamond text-4xl text-olive-600" />
            <p className="font-medium text-4xl text-white text-opacity-90 select-none">Premium</p>
          </div>
          <p className="text-xl text-center text-white text-opacity-90 select-none">
            Unlock Server Analytics and dozens of other features and grow your server immediately!
          </p>
          <Link href="/premium">
            <a className="flex flex-row items-center justify-center px-6 py-2 space-x-2 bg-olive-800 hover:bg-olive-900 rounded transition duration-300 cursor-pointer">
              <p className="text-2xl text-white select-none">See Other Perks</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

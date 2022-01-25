import Link from "next/link";

export default function Premium(props) {
  return (
    <div className="flex w-full items-center justify-between space-x-8">
      <div className="flex flex-col items-start justify-start space-y-2">
        <p className="max-w-md text-lg text-white text-opacity-90">
          Server Analytics provides you with a Bukkit plugin to add to your
          server. The plugin sends data to our site every hour and we
          intuitively display various graphs and statistics that can help you
          make data-driven decisions for your server&apos;s growth!
        </p>
        <ul className="list-inside list-disc">
          <li className="text-lg text-white text-opacity-80">
            Player Count Graphs (up to 30 days)
          </li>
          <li className="text-lg text-white text-opacity-80">
            Most Active Hours (Player Count)
          </li>
          <li className="text-lg text-white text-opacity-80">
            Upvote Count Graphs (up to 30 days)
          </li>
          <li className="text-lg text-white text-opacity-80">
            Most Active Hours (Upvote Count)
          </li>
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
      <div className="flex max-w-xs flex-col items-center justify-center space-y-6 rounded-lg border-2 border-olive-800 bg-olive-940 px-3 py-12">
        <div className="flex items-center justify-center space-x-2">
          <i className="fad fa-diamond text-4xl text-olive-600" />
          <p className="select-none text-4xl font-medium text-white text-opacity-90">
            Premium
          </p>
        </div>
        <p className="select-none text-center text-xl text-white text-opacity-90">
          Unlock Server Analytics and dozens of other features and grow your
          server immediately!
        </p>
        <Link href="/premium">
          <a className="flex cursor-pointer items-center justify-center space-x-2 rounded bg-olive-800 px-6 py-2 transition duration-300 hover:bg-olive-900">
            <p className="select-none text-2xl text-white">See Other Perks</p>
          </a>
        </Link>
      </div>
    </div>
  );
}

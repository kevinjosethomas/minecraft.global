export default function Home(props) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <i className="fas fa-home-alt text-3xl text-white text-opacity-90" />{" "}
        <p className="text-3xl font-medium text-white text-opacity-90">
          Home & Search Pages
        </p>
      </div>
      <p className="inline">
        Banner advertisements on the Home & Search pages are visible to all
        visitors and new users!
      </p>
      <ul className="mt-2 list-inside list-disc">
        <li>~4,500 impressions / month</li>
        <li>Around 400 x 100px resolution</li>
        <li>Current Price: $20 / week</li>
      </ul>
      <a
        className="flex items-center space-x-2"
        href="/images/homepage-sidebar-ad-preview.png"
        rel="noopener"
        target="_blank"
      >
        <p className="font-medium text-olive-400 underline">See Location</p>
        <i className="far fa-external-link-alt text-olive-400" />
      </a>
    </div>
  );
}

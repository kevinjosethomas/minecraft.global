export default function Home(props) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <i className="fas fa-home-alt text-2xl text-white text-opacity-90 md:text-3xl" />{" "}
        <p className="text-2xl font-medium text-white text-opacity-90 md:text-3xl">
          Home & Search Pages
        </p>
      </div>
      <p className="inline">
        Banner advertisements on the Home & Search pages are visible to all
        visitors and new users!
      </p>
      <ul className="mt-2 list-inside list-disc">
        <li>~3,000 impressions / month</li>
        <li>Resolution: 1200px x 200px</li>
        <li>Current Price: ${props.price} / week</li>
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

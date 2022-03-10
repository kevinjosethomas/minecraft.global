export default function Vote(props) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <i className="fas fa-arrow-alt-up t-whipacity-90 text-2xl md:text-3xl md:text-3xl" />{" "}
        <p className="text-2xl font-medium text-white text-opacity-90 md:text-3xl">
          Server Vote Page
        </p>
      </div>
      <p>
        Banner advertisements on the Server Vote page get the most impressions
        on the website!
      </p>
      <ul className="list-inside list-disc">
        <li>~10,000 impressions / month</li>
        <li>Around 1194 x 216px resolution</li>
        <li>Current Price: ${props.price} / week</li>
      </ul>
      <a
        className="flex items-center space-x-2"
        href="/images/votepage-footer-ad-preview.png"
        rel="noopener"
        target="_blank"
      >
        <p className="font-medium text-olive-400 underline">See Location</p>
        <i className="far fa-external-link-alt text-olive-400" />
      </a>
    </div>
  );
}

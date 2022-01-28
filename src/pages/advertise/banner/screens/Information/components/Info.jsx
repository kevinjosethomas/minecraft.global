export default function Info(props) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center space-x-2">
        <i className="far fa-info-circle text-3xl text-white text-opacity-90" />{" "}
        <p className="text-3xl font-medium text-white text-opacity-90">
          How do banner ads work?
        </p>
      </div>
      <p>Banner ads simply consist of an image and a link.</p>
      <ul className="mb-4 list-inside list-disc">
        <li>Advertisements will rotate every Saturday</li>
        <li>Prices are fixed but will be manually increased as we grow</li>
      </ul>
      <div className="mb-2 flex items-center space-x-2">
        <i className="far fa-badge-dollar text-3xl text-white text-opacity-90" />{" "}
        <p className="text-3xl font-medium text-white text-opacity-90">
          How to purchase a banner ad?
        </p>
      </div>
      <p>You can purchase a banner ad for any week in the next 4 weeks.</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          Create a product in{" "}
          <span
            onClick={() => props.setScreen(props.screens[1])}
            className="cursor-pointer font-medium text-olive-400 underline"
          >
            Products
          </span>{" "}
          and upload your banner image and URL.
        </li>
        <li>
          Now, choose an advertisement slot and week in{" "}
          <span
            onClick={() => props.setScreen(props.screens[2])}
            className="cursor-pointer font-medium text-olive-400 underline"
          >
            Purchase
          </span>
        </li>
        <li>
          Select the product you want to advertise and complete the purchase!
        </li>
      </ul>
      <p>
        There are two banner advertising slots available on minecraft.global -
      </p>
      <ul className="list-inside list-disc">
        <li>Server Vote Page (footer)</li>
        <li>Home & Search Pages (sidebar)</li>
      </ul>
    </div>
  );
}

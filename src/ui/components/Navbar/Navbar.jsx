import Element from "./components/Element";

export default function Navbar(props) {
  const elements = [
    {
      icon: "far fa-stars",
      label: "Discover",
      href: "/",
    },
    {
      icon: "far fa-gem",

      label: "Premium",
      href: "/premium",
    },
    {
      icon: "far fa-dollar-badge",
      label: "Advertise",
      href: "/auctions",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center justify-start space-x-[28px]">
        <img src="/logo.svg" className="w-10 h-10" alt="Logo" />
        {elements.map((element) => (
          <Element
            key={element.label}
            icon={element.icon}
            label={element.label}
            href={element.href}
          />
        ))}
      </div>
    </div>
  );
}

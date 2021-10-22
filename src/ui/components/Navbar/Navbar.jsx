import Social from "./components/Social";
import Element from "./components/Element";

export default function Navbar(props) {
  const elements = [
    {
      icon: "far fa-stars",
      label: "Discover",
      href: "/",
    },
    {
      icon: "far fa-badge-dollar",
      label: "Advertise",
      href: "/auctions",
    },
  ];

  const socials = [
    {
      icon: "fab fa-discord",
      href: "https://discord.minecraft.global",
    },
    {
      icon: "fab fa-twitter",
      href: "https://twitter.com/mcdotglobal",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between py-[32px] w-full">
      <div className="flex flex-row items-center justify-start space-x-[28px]">
        <img src="/logo.svg" className="w-10 h-10" alt="Logo" />
        {elements.map((element, index) => (
          <Element key={index} icon={element.icon} label={element.label} href={element.href} />
        ))}
        <div className="flex flex-row items-center justify-start mt-1 space-x-[12px]">
          {socials.map((social, index) => (
            <Social key={index} icon={social.icon} href={social.href} />
          ))}
        </div>

        <i className="far fa-angle-down text-[24px] text-white text-opacity-80" />
      </div>
    </div>
  );
}

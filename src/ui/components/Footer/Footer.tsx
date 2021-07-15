import Link from "next/link";

import Column from "./components/Column";

function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 space-y-12 bg-dark-800">
      <div className="flex flex-row items-center justify-between w-full">
        <img src="/images/logo.svg" alt="Logo" className="w-32" />
        <Column
          title="Community"
          rows={[
            { label: "Partners", href: "/partners" },
            { label: "Giveaways", href: "/giveaways" },
            { label: "Support", href: "/support" },
          ]}
        />
        <Column
          title="Invest"
          rows={[
            { label: "Premium", href: "/premium" },
            { label: "Auctions", href: "/auctions" },
            { label: "Advertise", href: "/advertise" },
          ]}
        />
        <Column
          title="Website"
          rows={[
            { label: "Quick Search", href: "/search" },
            { label: "Browse Servers", href: "/" },
            { label: "Random Server", href: "/random" },
          ]}
        />
        <Column
          title="Legal"
          rows={[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Contact Us", href: "/contact" },
          ]}
        />
      </div>
      <div className="h-0.5 w-full bg-dark-400" />
      <div className="flex flex-row items-center justify-between w-full">
        <span className="font-medium text-lg text-gray-400">
          minecraft.global | Not associated with{" "}
          <a
            href="https://minecraft.net"
            rel="noreferrer nofollow"
            target="_blank"
            className="hover:text-gray-300 transition duration-300"
          >
            Minecraft
          </a>
          ,{" "}
          <a
            href="https://minecraft.net"
            rel="noreferrer nofollow"
            target="_blank"
            className="hover:text-gray-300 transition duration-300"
          >
            Mojang
          </a>{" "}
          or{" "}
          <a
            href="https://microsoft.com"
            rel="noreferrer nofollow"
            target="_blank"
            className="hover:text-gray-300 transition duration-300"
          >
            Microsoft
          </a>
        </span>
        <div className="flex flex-row items-center justify-center space-x-4">
          <a href="https://discord.minecraft.global/" rel="noreferrer" target="_blank">
            <i className="fab fa-discord text-lg text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
          <a href="https://twitter.com/mcdotglobal" rel="noreferrer" target="_blank">
            <i className="fab fa-twitter text-lg text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
          <a href="mailto:team@minecraft.global">
            <i className="fas fa-envelope text-lg text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import Link from "next/link";

import Column from "./components/Column";

function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full p-5 md:p-20 3xl:px-56 space-y-6 md:space-y-12 bg-dark-800">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full space-y-4 md:space-y-0">
        <img src="/images/logo.svg" alt="Logo" className="hidden md:inline w-32" />
        <Column
          title="Community"
          rows={[
            { icon: "far fa-handshake", label: "Partners", href: "/partners" },
            { icon: "far fa-question-circle", label: "Support", href: "/support" },
            { icon: "fab fa-medium-m", label: "Blog", href: "/blog" },
          ]}
        />
        <Column
          title="Invest"
          rows={[
            { icon: "far fa-gem", label: "Premium", href: "/premium" },
            { icon: "far fa-heartbeat", label: "Auctions", href: "/auctions" },
            { icon: "far fa-newspaper", label: "Advertise", href: "/advertise" },
          ]}
        />
        <Column
          title="Website"
          rows={[
            { icon: "far fa-search", label: "Quick Search", href: "/search" },
            { icon: "far fa-sparkles", label: "Browse Servers", href: "/" },
            { icon: "far fa-random", label: "Random Server", href: "/random" },
          ]}
        />
        <Column
          title="Legal"
          rows={[
            { icon: "far fa-user-secret", label: "Privacy Policy", href: "/privacy" },
            { icon: "far fa-ballot-check", label: "Terms of Service", href: "/terms" },
            { icon: "far fa-phone-alt", label: "Contact Us", href: "/contact" },
          ]}
        />
      </div>
      <div className="h-0.5 w-full bg-dark-400" />
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full space-y-2">
        <span className="font-medium text-lg text-center text-gray-400">
          minecraft.global is not associated with{" "}
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
            <i className="fab fa-discord text-xl md:text-lg text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
          <a href="https://twitter.com/mcdotglobal" rel="noreferrer" target="_blank">
            <i className="fab fa-twitter text-xl md:text-lg text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
          <a href="mailto:team@minecraft.global">
            <i className="fas fa-envelope text-xl md:text-lg text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

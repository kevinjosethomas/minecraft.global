import Link from "next/link";

export default function Links(props) {
  const footer = [
    {
      name: "Community",
      links: [
        {
          icon: "far fa-handshake",
          name: "Partners",
          href: "/partners",
        },
        {
          icon: "far fa-question-circle",
          name: "Support",
          href: "/support",
        },
        {
          icon: "far fa-book",
          name: "Blog",
          href: "/blog",
        },
      ],
    },
    {
      name: "Invest",
      links: [
        {
          icon: "far fa-gem",
          name: "Premium",
          href: "/premium",
        },
        {
          icon: "far fa-heartbeat",
          name: "Advertise",
          href: "/advertise",
        },
        {
          icon: "far fa-newspaper",
          name: "Reach Out",
          href: "/support",
        },
      ],
    },
    {
      name: "Website",
      links: [
        {
          icon: "far fa-search",
          name: "Quick Search",
          href: "/search",
        },
        {
          icon: "far fa-sparkles",
          name: "Browse Servers",
          href: "/",
        },
        {
          icon: "far fa-random",
          name: "Random Server",
          href: "/random",
        },
      ],
    },
    {
      name: "Legal",
      links: [
        {
          icon: "far fa-user-secret",
          name: "Privacy Policy",
          href: "/privacy",
        },
        {
          icon: "far fa-ballot-check",
          name: "Terms of Service",
          href: "/terms",
        },
        {
          icon: "far fa-phone-alt",
          name: "Contact Us",
          href: "/support",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-16">
      <Link href="/">
        <a>
          <img
            src="/logo.svg"
            draggable="false"
            className="hidden md:inline w-32 h-32 cursor-pointer"
            alt="Logo"
          />
        </a>
      </Link>
      <div className="flex flex-col md:flex-row items-start justify-start md:justify-between w-full space-y-2 md:space-y-0">
        {footer.map((element, index) => (
          <Column key={index} {...element} />
        ))}
      </div>
    </div>
  );
}

function Column(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full md:w-auto px-4 py-3 md:py-0 md:space-y-2 bg-olive-950 md:bg-transparent border-2 md:border-0 border-olive-920 rounded">
      <p className="hidden md:inline font-medium text-xl text-white text-opacity-90">
        {props.name}
      </p>
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        {props.links.map((link, index) => (
          <Row key={index} {...link} />
        ))}
      </div>
    </div>
  );
}

function Row(props) {
  return (
    <Link href={props.href}>
      <a className="flex flex-row items-center justify-start space-x-4 md:space-x-0">
        <i
          className={`${props.icon} md:hidden w-[25px] text-center text-xl text-white text-opacity-60`}
        />
        <p className="text-xl text-white text-opacity-60 hover:text-opacity-70 transition duration-300">
          {props.name}
        </p>
      </a>
    </Link>
  );
}

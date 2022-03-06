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
    <div className="flex w-full flex-col items-center justify-between md:flex-row md:space-x-16">
      <Link href="/">
        <a>
          <img
            src="/logo.svg"
            draggable="false"
            className="hidden h-32 w-32 cursor-pointer md:inline"
            alt="Logo"
          />
        </a>
      </Link>
      <div className="flex w-full flex-col items-start justify-start space-y-2 md:flex-row md:justify-between md:space-y-0">
        {footer.map((element, index) => (
          <Column key={index} {...element} />
        ))}
      </div>
    </div>
  );
}

function Column(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start rounded-xl border-2 border-olive-920 bg-olive-930 px-4 py-3 md:w-auto md:space-y-2 md:border-0 md:bg-transparent md:py-0">
      <p className="hidden text-xl font-medium text-white text-opacity-90 md:inline">
        {props.name}
      </p>
      <div className="flex w-full flex-col items-start justify-start space-y-2">
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
      <a className="flex items-center justify-start space-x-4 md:space-x-0">
        <i
          className={`${props.icon} w-[25px] text-center text-xl text-white text-opacity-80 md:hidden md:text-opacity-60`}
        />
        <p className="text-xl text-white text-opacity-80 transition duration-300 hover:text-opacity-70 md:text-opacity-60">
          {props.name}
        </p>
      </a>
    </Link>
  );
}

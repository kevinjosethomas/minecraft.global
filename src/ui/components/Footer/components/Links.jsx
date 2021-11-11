import Link from "next/link";

export default function Links(props) {
  const footer = [
    {
      name: "Community",
      links: [
        {
          name: "Partners",
          href: "/partners",
        },
        {
          name: "Support",
          href: "/support",
        },
        {
          name: "Blog",
          href: "/blog",
        },
      ],
    },
    {
      name: "Invest",
      links: [
        {
          name: "Premium",
          href: "/premium",
        },
        {
          name: "Advertise",
          href: "/advertise",
        },
        {
          name: "Reach Out",
          href: "/support",
        },
      ],
    },
    {
      name: "Website",
      links: [
        {
          name: "Quick Search",
          href: "/search",
        },
        {
          name: "Browse Servers",
          href: "/",
        },
        {
          name: "Random Server",
          href: "/random",
        },
      ],
    },
    {
      name: "Legal",
      links: [
        {
          name: "Privacy Policy",
          href: "/partners",
        },
        {
          name: "Terms of Service",
          href: "/terms",
        },
        {
          name: "Contact Us",
          href: "/support",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Link href="/" passHref>
        <img src="/logo.svg" className="w-32 h-32 cursor-pointer" alt="Logo" />
      </Link>
      {footer.map((element, index) => (
        <Column key={index} {...element} />
      ))}
    </div>
  );
}

function Column(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <p className="font-medium text-xl text-white text-opacity-90">{props.name}</p>
      <div className="flex flex-col items-start justify-start space-y-1">
        {props.links.map((link, index) => (
          <Link key={index} href={link.href}>
            <a className="text-xl text-white text-opacity-60 hover:text-opacity-70 transition duration-300">
              {link.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

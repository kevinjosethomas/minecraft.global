import Link from "next/link";

export default function Dropdown(props) {
  const categories = [
    {
      label: "Links",
      links: [
        {
          label: "Premium",
          href: "/premium",
        },
        {
          label: "Advertise",
          href: "/auctions",
        },
        {
          label: "Random Server",
          href: "/random",
        },
      ],
    },
    {
      label: "Community",
      links: [
        {
          label: "Partners",
          href: "/partners",
        },
        {
          label: "Support",
          href: "/support",
        },
        {
          label: "Blog",
          href: "/blog",
        },
      ],
    },
    {
      label: "Legal",
      links: [
        {
          label: "Privacy Policy",
          href: "/privacy",
        },
        {
          label: "Terms of Service",
          href: "/terms",
        },
        {
          label: "Contact Us",
          href: "/support",
        },
      ],
    },
  ];
  return (
    <div className="absolute top-10 flex flex-col items-start justify-start bg-olive-940 bg-opacity-50 border-2 border-olive-900 rounded-[4px]">
      {categories.map((category, index) => (
        <DropdownCategory key={index} {...category} />
      ))}
    </div>
  );
}

function DropdownCategory(props) {
  return (
    <div className="flex flex-col items-start justify-start w-64 p-2">
      <span className="pb-1 pl-2 font-medium text-[28px] text-white text-opacity-75">
        {props.label}
      </span>
      <div className="flex flex-col items-start justify-start w-full">
        {props.links.map((link, index) => (
          <DropdownLink key={index} label={link.label} href={link.href} />
        ))}
      </div>
    </div>
  );
}

function DropdownLink(props) {
  const children = (
    <div className="group flex flex-row items-center justify-start select-none w-full pl-2 py-0.5 hover:bg-olive-920 transition duration-300 cursor-pointer rounded-[4px]">
      <span className="text-[22px] text-white text-opacity-50 group-hover:text-opacity-70 transition duration-300">
        {props.label}
      </span>
    </div>
  );

  if (props.href.startsWith("/")) {
    return (
      <Link href={props.href} passHref={true}>
        {children}
      </Link>
    );
  } else {
    return <a href={props.href}>{children}</a>;
  }
}

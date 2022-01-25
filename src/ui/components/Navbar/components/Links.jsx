import Link from "next/link";

export default function Links(props) {
  const elements = [
    {
      icon: "far fa-stars",
      label: "Discover",
      href: "/search",
    },
    {
      icon: "far fa-badge-dollar",
      label: "Premium",
      href: "/premium",
    },
    // {
    //   icon: "far fa-stars",
    //   label: "Advertise",
    //   href: "/auctions",
    // },
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
    {
      icon: "far fa-question-circle",
      href: "/why",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-start space-x-[28px]">
      <Link href="/">
        <a>
          <img
            src="/logo.svg"
            className="h-10 w-10 transform cursor-pointer duration-1000 hover:rotate-[360deg]"
            alt="Logo"
          />
        </a>
      </Link>
      {elements.map((element, index) => (
        <Element
          key={index}
          icon={element.icon}
          label={element.label}
          href={element.href}
        />
      ))}
      <div className="mt-1 flex flex-row items-center justify-start space-x-[12px]">
        {socials.map((social, index) => (
          <Social key={index} icon={social.icon} href={social.href} />
        ))}
      </div>
    </div>
  );
}

function Element(props) {
  return (
    <Link href={props.href}>
      <a className="group flex flex-row items-center justify-start space-x-2">
        <i
          className={`${props.icon} text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90`}
        />
        <p className="text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90">
          {props.label}
        </p>
      </a>
    </Link>
  );
}

function Social(props) {
  const Container = ({ children }) => {
    if (props.href.startsWith("/")) {
      return (
        <Link href={props.href}>
          <a>{children}</a>
        </Link>
      );
    } else {
      return (
        <a href={props.href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
  };

  return (
    <Container>
      <i
        className={`${props.icon} text-xl text-white text-opacity-80 transition duration-300 hover:text-opacity-90`}
      />
    </Container>
  );
}
